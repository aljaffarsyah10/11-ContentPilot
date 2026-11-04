import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { ideaService } from "@/services/idea.service";
import { convertIdeaSchema } from "@/lib/validation/idea.schema";
import { handleApiError } from "@/lib/error/api-error";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuthUser();
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const validated = convertIdeaSchema.parse(body);

    const createdContent = await ideaService.convertToContent(id, user.id, validated);

    return NextResponse.json(
      {
        success: true,
        data: createdContent,
        message: "Ide berhasil dikonversi menjadi materi konten",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

