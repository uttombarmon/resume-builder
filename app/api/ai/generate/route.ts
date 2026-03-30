import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/dbConfig";
import { resume as resumeTable, user as userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { user } = session;
    
    // Check if user is Pro
    const dbUser = await db.query.user.findFirst({
        where: eq(userTable.id, user.id)
    });

    if (dbUser?.plan !== "pro") {
        // Limit for free users (e.g., check count of resumes)
        const userResumes = await db.query.resume.findMany({
            where: eq(resumeTable.userId, user.id)
        });

        if (userResumes.length >= 1) {
            return new NextResponse("Upgrade to Pro for more AI generations", { status: 403 });
        }
    }

    const { name, role, experience, skills } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Create a professional resume in JSON format for the following person:
      Name: ${name}
      Target Role: ${role}
      Experience Summary: ${experience}
      Skills: ${skills}

      The JSON should strictly follow this structure:
      {
        "personalInfo": { "name": "", "email": "", "phone": "", "role": "" },
        "summary": "",
        "experience": [
          { "company": "", "role": "", "duration": "", "description": [] }
        ],
        "education": [
          { "school": "", "degree": "", "duration": "" }
        ],
        "skills": []
      }

      Return ONLY the JSON. No markdown formatting, no extra text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up markdown if present
    if (text.startsWith("```json")) {
        text = text.replace(/```json|```/g, "").trim();
    }

    const generatedContent = JSON.parse(text);

    // Save to database
    const resumeId = uuidv4();
    await db.insert(resumeTable).values({
      id: resumeId,
      name: `${role} Resume (AI Generated)`,
      userId: user.id,
      content: JSON.stringify(generatedContent),
      templateId: "default",
    });

    return NextResponse.json({ id: resumeId, content: generatedContent });
  } catch (error) {
    console.error("[AI_GENERATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
