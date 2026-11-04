import { getMockContents } from "@/features/contents/mocks/content.mock";
import { ContentItem } from "@/types/content.types";

export function getMockCalendarEvents(): ContentItem[] {
  // Hanya konten yang memiliki scheduledAt
  return getMockContents().filter((item) => Boolean(item.scheduledAt));
}

