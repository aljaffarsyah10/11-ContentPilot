import { NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { dashboardService } from "@/services/dashboard.service";
import { handleApiError } from "@/lib/error/api-error";

export async function GET() {
  try {
    const user = await requireAuthUser();

    const data = await dashboardService.getDashboardData(user.id);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

