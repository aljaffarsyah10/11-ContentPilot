import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { contentService } from "@/services/content.service";
import { handleApiError } from "@/lib/error/api-error";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuthUser();
    const { id } = await params;

    const duplicated = await contentService.duplicateContent(id, user.id);

    return NextResponse.json(
      {
        success: true,
        data: duplicated,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
