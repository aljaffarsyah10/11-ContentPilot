import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { contentService } from "@/services/content.service";
import { updateContentSchema } from "@/lib/validation/content.schema";
import { handleApiError } from "@/lib/error/api-error";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuthUser();
    const { id } = await params;

    const content = await contentService.getContent(id, user.id);

    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuthUser();
    const { id } = await params;
    const body = await req.json();
    const validated = updateContentSchema.parse(body);

    const updated = await contentService.updateContent(id, user.id, validated);

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Konten berhasil diperbarui",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuthUser();
    const { id } = await params;

    const deleted = await contentService.deleteContent(id, user.id);

    return NextResponse.json({
      success: true,
      data: deleted,
      message: "Konten berhasil dihapus",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

