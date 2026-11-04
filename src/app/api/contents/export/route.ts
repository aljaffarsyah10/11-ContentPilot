import { NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { contentService } from "@/services/content.service";
import { handleApiError } from "@/lib/error/api-error";

export async function GET() {
  try {
    const user = await requireAuthUser();

    const csvData = await contentService.exportContentsCsv(user.id);
    const filename = `contentpilot-export-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

