import { SocialPlatform } from "@/components/shared/platform-badge";
import { ContentStatus } from "@/components/shared/status-badge";

export interface ContentItem {
  id: string;
  userId: string;
  title: string;
  caption: string | null;
  hashtags: string[];
  platform: SocialPlatform;
  status: ContentStatus;
  scheduledAt: string | null; // ISO UTC string
  notes: string | null;
  originIdeaId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentInput {
  title: string;
  caption?: string | null;
  hashtags?: string[];
  platform: SocialPlatform;
  status: ContentStatus;
  scheduledAt?: string | null;
  notes?: string | null;
  originIdeaId?: string | null;
}

