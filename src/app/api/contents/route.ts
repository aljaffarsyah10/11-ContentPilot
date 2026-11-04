import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { contentService } from "@/services/content.service";
import { createContentSchema, queryContentSchema } from "@/lib/validation/content.schema";
import { handleApiError } from "@/lib/error/api-error";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuthUser();
    const searchParams = req.nextUrl.searchParams;

    const query = queryContentSchema.parse({
      search: searchParams.get("search") || undefined,
      platform: searchParams.get("platform") || undefined,
      status: searchParams.get("status") || undefined,
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
    });

    const result = await contentService.listContents(user.id, query);

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
    const validated = createContentSchema.parse(body);

    const created = await contentService.createContent(user.id, validated);

    return NextResponse.json(
      {
        success: true,
        data: created,
        message: "Konten berhasil dibuat",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

