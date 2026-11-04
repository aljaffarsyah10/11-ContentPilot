import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { ideaService } from "@/services/idea.service";
import { createIdeaSchema, queryIdeaSchema } from "@/lib/validation/idea.schema";
import { handleApiError } from "@/lib/error/api-error";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuthUser();
    const searchParams = req.nextUrl.searchParams;

    const query = queryIdeaSchema.parse({
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") || undefined,
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
    });

    const result = await ideaService.listIdeas(user.id, query);

    return NextResponse.json({
      success: true,
      data: result.items,
      meta: result.meta,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthUser();
    const body = await req.json();
    const validated = createIdeaSchema.parse(body);

    const created = await ideaService.createIdea(user.id, validated);

    return NextResponse.json(
      {
        success: true,
        data: created,
        message: "Ide berhasil ditambahkan",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

