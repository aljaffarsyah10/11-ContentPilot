import { contentRepository } from "@/repositories/content.repository";

export class CalendarService {
  async getCalendarEvents(
    userId: string,
    params: {
      startDate?: string;
      endDate?: string;
    }
  ) {
    const start = params.startDate ? new Date(params.startDate) : undefined;
    const end = params.endDate ? new Date(params.endDate) : undefined;

    return contentRepository.findCalendarEvents(userId, start, end);
  }
}

export const calendarService = new CalendarService();

