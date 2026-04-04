import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/dbConfig";
import { resume as resumeTable, user as userTable } from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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
      where: eq(userTable.id, user.id),
    });

    if (dbUser?.plan !== "pro") {
      return new NextResponse("Upgrade to Pro for job optimization", {
        status: 403,
      });
    }

    const { resumeId, jobDescription } = await req.json();

    const existingResume = await db.query.resume.findFirst({
      where: eq(resumeTable.id, resumeId),
    });

    if (!existingResume || existingResume.userId !== user.id) {
      return new NextResponse("Resume not found", { status: 404 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" }); // Use Pro for better optimization

    const prompt = `
      You are an expert career coach and ATS optimization specialist.
      Optimize the following resume for this specific job description:
      
      Job Description:
      ${jobDescription}

      Current Resume Content (JSON):
      ${existingResume.content}

      TASKS:
      1. Tailor the professional summary to match the job requirements precisely.
      2. Rephrase experience bullet points to highlight relevant achievements and include high-impact keywords from the job description. Do NOT fabricate experience.
      3. Reorder or highlight skills that are most critical to this specific role.
      4. Provide a "matchScore" (0-100) based on how well the optimized resume fits the job description.
      5. Provide a "suggestions" array of 3 key changes you made.

      OUTPUT FORMAT (STRICT JSON ONLY):
      {
        "optimizedContent": {
          "sections": [
             // ALL sections from the input, updated as needed
             // Each section.content must still have its "type" property
          ],
          "design": {
             // Keep the design object from the input unchanged
          }
        },
        "analysis": {
          "score": number,
          "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
        }
      }

      Return ONLY the JSON. No markdown formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Robust JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("[AI_OPTIMIZE] No JSON found in response:", text);
      return new NextResponse("AI failed to generate valid JSON content", {
        status: 500,
      });
    }

    let resultData;
    try {
      resultData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error(
        "[AI_OPTIMIZE] JSON Parse Error:",
        parseError,
        "Original text:",
        text,
      );
      return new NextResponse("Failed to parse AI-generated content", {
        status: 500,
      });
    }

    const { optimizedContent, analysis } = resultData;

    // Update the resume in the database
    await db
      .update(resumeTable)
      .set({
        content: JSON.stringify(optimizedContent),
        updatedAt: new Date(),
      })
      .where(eq(resumeTable.id, resumeId));

    return NextResponse.json({
      success: true,
      content: optimizedContent,
      analysis: analysis || {
        score: 85,
        suggestions: [
          "Optimized summary for keywords",
          "Tailored bullet points",
          "Highlighted core skills",
        ],
      },
    });
  } catch (error) {
    console.error("[AI_OPTIMIZE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
