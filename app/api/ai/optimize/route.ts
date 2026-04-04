import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/dbConfig";
import { resume as resumeTable, user as userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

    // Check if user is Pro - optimization is a Pro feature
    const dbUser = await db.query.user.findFirst({
        where: eq(userTable.id, user.id)
    });

    if (dbUser?.plan !== "pro") {
        return new NextResponse("Upgrade to Pro for job optimization", { status: 403 });
    }

    const { resumeId, jobDescription } = await req.json();

    const existingResume = await db.query.resume.findFirst({
        where: eq(resumeTable.id, resumeId)
    });

    if (!existingResume || existingResume.userId !== user.id) {
        return new NextResponse("Resume not found", { status: 404 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Use Pro for better optimization

    const prompt = `
      You are an expert career coach and ATS optimization specialist.
      Optimize the following resume for this specific job description:
      
      Job Description:
      ${jobDescription}

      Existing Resume Content (JSON):
      ${existingResume.content}

      Tasks:
      1. Tailor the professional summary to match the job requirements.
      2. Rephrase experience bullet points to highlight relevant achievements and keywords from the job description.
      3. Reorder or highlight skills that are most critical to the role.
      4. Ensure the output is a valid JSON strictly following the same structure as the input.

      Return ONLY the optimized JSON. No markdown formatting, no extra text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Robust JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        console.error("[AI_OPTIMIZE] No JSON found in response:", text);
        return new NextResponse("AI failed to generate valid JSON content", { status: 500 });
    }
    
    let optimizedContent;
    try {
        optimizedContent = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
        console.error("[AI_OPTIMIZE] JSON Parse Error:", parseError, "Original text:", text);
        return new NextResponse("Failed to parse AI-generated content", { status: 500 });
    }

    // Update the resume in the database
    await db.update(resumeTable)
      .set({
        content: JSON.stringify(optimizedContent),
        updatedAt: new Date(),
      })
      .where(eq(resumeTable.id, resumeId));

    return NextResponse.json({ success: true, content: optimizedContent });
  } catch (error) {
    console.error("[AI_OPTIMIZE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
