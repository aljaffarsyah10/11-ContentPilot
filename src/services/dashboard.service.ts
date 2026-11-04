import { dashboardRepository } from "@/repositories/dashboard.repository";
import { contentRepository } from "@/repositories/content.repository";
import { ideaRepository } from "@/repositories/idea.repository";

export class DashboardService {
  async getDashboardData(userId: string) {
    const [metrics, upcoming, recentIdeas] = await Promise.all([
      dashboardRepository.getMetrics(userId),
      contentRepository.findUpcoming(userId, 5),
      ideaRepository.findRecent(userId, 3),
    ]);

    return {
      metrics,
      upcoming,
      recentIdeas,
    };
  }
}

export const dashboardService = new DashboardService();

