import { prisma } from "@/lib/db/prisma";

export class DashboardRepository {
  async getMetrics(userId: string) {
    const [totalContents, scheduledCount, draftCount, publishedCount, activeIdeasCount] =
      await Promise.all([
        prisma.content.count({ where: { userId } }),
        prisma.content.count({ where: { userId, status: "SCHEDULED" } }),
        prisma.content.count({ where: { userId, status: "DRAFT" } }),
        prisma.content.count({ where: { userId, status: "PUBLISHED" } }),
        prisma.contentIdea.count({
          where: {
            userId,
            status: { in: ["NEW", "IN_PROGRESS"] },
          },
        }),
      ]);

    return {
      totalContents,
      scheduledCount,
      draftCount,
      publishedCount,
      activeIdeasCount,
    };
  }
}

export const dashboardRepository = new DashboardRepository();

