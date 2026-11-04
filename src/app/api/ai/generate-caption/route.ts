import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { aiCaptionService } from "@/services/ai-caption.service";
import { generateCaptionInputSchema } from "@/lib/validation/ai.schema";
import { handleApiError } from "@/lib/error/api-error";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthUser();
    const body = await req.json();
    const validated = generateCaptionInputSchema.parse(body);

    const result = await aiCaptionService.generateCaptions(user.id, validated);

    return NextResponse.json({
      success: true,
      data: result,
      message: "Caption berhasil dihasilkan oleh AI",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

