import { prisma } from "@/lib/db/prisma";
import { SocialPlatform } from "@prisma/client";

export class AIGenerationRepository {
  async log(data: {
    userId: string;
    platform: SocialPlatform;
    topic: string;
    tone: string;
    language: string;
    captionCount: number;
  }) {
    return prisma.aIGeneration.create({
      data: {
        userId: data.userId,
        platform: data.platform,
        topic: data.topic,
        tone: data.tone,
        language: data.language,
        captionCount: data.captionCount,
      },
    });
  }

  async countRecentRequests(userId: string, windowMinutes: number = 10) {
    const since = new Date(Date.now() - windowMinutes * 60 * 1000);
    return prisma.aIGeneration.count({
      where: {
        userId,
        createdAt: { gte: since },
      },
    });
  }
}

export const aiGenerationRepository = new AIGenerationRepository();

