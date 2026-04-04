import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/dbConfig";
import { resume as resumeTable, user as userTable } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new NextResponse("Gemini API Key is missing", { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
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
      where: eq(userTable.id, user.id),
    });

    if (dbUser?.plan !== "pro") {
      // Limit for free users (e.g., check count of resumes)
      const userResumes = await db.query.resume.findMany({
        where: eq(resumeTable.userId, user.id),
      });

      if (userResumes.length >= 1) {
        return new NextResponse("Upgrade to Pro for more AI generations", {
          status: 403,
        });
      }
    }

    const { name, role, experience, skills } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
  Generate a highly ATS-optimized professional resume in a structured JSON format. 
  
  USER DATA:
  - Name: ${name}
  - Role: ${role}
  - Experience: ${experience}
  - Skills: ${skills}

  ATS COMPLIANCE RULES:
  1. Use standard headings: "Professional Summary", "Work Experience", "Education", and "Skills".
  2. Structure experience in a linear, reverse-chronological order.
  3. Avoid using tables or complex nesting for the skill items; use a clean, comma-separated string for each category.
  4. Ensure dates and locations are clearly associated with their respective company or institution.
  5. Use high-impact action verbs (e.g., "Developed," "Optimized," "Managed") and include quantifiable metrics where possible.

  STRICT JSON STRUCTURE:
  {
    "sections": [
      {
        "id": "unique-uuid-v4",
        "type": "header",
        "content": { "name": "${name}", "title": "${role}", "email": "email@example.com", "phone": "+1 (555) 000-0000", "location": "City, State", "linkedin": "linkedin.com/in/username", "website": "" }
      },
      {
        "id": "unique-uuid-v4",
        "type": "summary",
        "content": { "title": "Professional Summary", "text": "A concise, keyword-rich 3-line summary optimized for ${role} roles." }
      },
      {
        "id": "unique-uuid-v4",
        "type": "experience",
        "content": { 
          "title": "Work Experience", 
          "entries": [
            { "id": "uuid", "company": "Company Name", "role": "Job Title", "startDate": "Month Year", "endDate": "Present", "location": "City, State", "bullets": ["Accomplished X by performing Y, resulting in Z.", "Optimized system performance by 30% using modern frameworks."] }
          ] 
        }
      },
      {
        "id": "unique-uuid-v4",
        "type": "skills",
        "content": { 
          "title": "Skills", 
          "categories": [
            { "id": "uuid", "name": "Technical Skills", "items": "List relevant keywords here separated by commas" }
          ] 
        }
      }
    ],
    "design": { "templateId": "classic", "fontFamily": "inter", "accentColor": "#1e40af", "fontSize": "md" }
  }

  Return ONLY the raw JSON. No markdown, no backticks, no conversational text.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Robust JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("[AI_GENERATE] No JSON found in response:", text);
      return new NextResponse("AI failed to generate valid JSON content", {
        status: 500,
      });
    }

    let generatedContent;
    try {
      generatedContent = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error(
        "[AI_GENERATE] JSON Parse Error:",
        parseError,
        "Original text:",
        text,
      );
      return new NextResponse("Failed to parse AI-generated content", {
        status: 500,
      });
    }

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
