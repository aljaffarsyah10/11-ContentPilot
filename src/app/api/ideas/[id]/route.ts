import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { ideaService } from "@/services/idea.service";
import { updateIdeaSchema } from "@/lib/validation/idea.schema";
import { handleApiError } from "@/lib/error/api-error";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuthUser();
    const { id } = await params;

    const idea = await ideaService.getIdea(id, user.id);

    return NextResponse.json({
      success: true,
      data: idea,
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
    const validated = updateIdeaSchema.parse(body);

    const updated = await ideaService.updateIdea(id, user.id, validated);

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Ide berhasil diperbarui",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuthUser();
    const { id } = await params;

    const deleted = await ideaService.deleteIdea(id, user.id);

    return NextResponse.json({
      success: true,
      data: deleted,
      message: "Ide berhasil dihapus",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

