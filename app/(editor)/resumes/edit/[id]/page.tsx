import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db/dbConfig";
import { resume as resumeTable } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { ResumeEditor } from "@/components/editor/ResumeEditor";
import { getDefaultResumeData } from "@/lib/editor/defaults";
import type { ResumeData } from "@/lib/editor/types";

export const metadata = {
  title: "Resume Editor – ResumePro",
};

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/auth/signin");

  const { id } = await params;

  const [row] = await db
    .select()
    .from(resumeTable)
    .where(and(eq(resumeTable.id, id), eq(resumeTable.userId, session.user.id)));

  if (!row) notFound();

  // Parse stored content or fall back to defaults
  let resumeData: ResumeData;
  try {
    const parsed = row.content ? JSON.parse(row.content) : null;
    if (parsed?.sections && parsed?.design) {
      resumeData = { id: row.id, name: row.name, ...parsed };
    } else {
      resumeData = getDefaultResumeData(row.id, row.name);
    }
  } catch {
    resumeData = getDefaultResumeData(row.id, row.name);
  }

  return <ResumeEditor initialData={resumeData} />;
}
