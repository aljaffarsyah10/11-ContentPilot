import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth/session";
import { calendarService } from "@/services/calendar.service";
import { handleApiError } from "@/lib/error/api-error";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuthUser();
    const searchParams = req.nextUrl.searchParams;

    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;

    const events = await calendarService.getCalendarEvents(user.id, {
      startDate,
      endDate,
    });

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

