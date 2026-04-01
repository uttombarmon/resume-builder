import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/dbConfig";
import { resume as resumeTable, user as userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { getDefaultResumeData } from "@/lib/editor/defaults";

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

        // if (userResumes.length >= 1) {
        //     return new NextResponse("Upgrade to Pro to create more resumes", { status: 403 });
        // }
    }

    let templateId = "default";
    try {
        const body = await req.json();
        if (body.templateId) {
            templateId = body.templateId;
        }
    } catch {}

    // Save to database
    const resumeId = uuidv4();
    const defaultData = getDefaultResumeData(resumeId, "My Resume");
    
    // update templateId in default data design if specified
    if (templateId !== "default") {
        defaultData.design.template = templateId;
    }

    await db.insert(resumeTable).values({
      id: resumeId,
      name: `My Resume`,
      userId: user.id,
      content: JSON.stringify(defaultData),
      templateId: templateId.toString(),
    });

    return NextResponse.json({ id: resumeId, content: defaultData });
  } catch (error) {
    console.error("[CREATE_RESUME]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
