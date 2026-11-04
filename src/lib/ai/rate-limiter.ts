import { aiGenerationRepository } from "@/repositories/ai-generation.repository";
import { RateLimitError } from "@/lib/error/api-error";

const MAX_REQUESTS_PER_WINDOW = 10;
const WINDOW_MINUTES = 10;

export async function checkAIRateLimit(userId: string): Promise<void> {
  const recentCount = await aiGenerationRepository.countRecentRequests(userId, WINDOW_MINUTES);

  if (recentCount >= MAX_REQUESTS_PER_WINDOW) {
    throw new RateLimitError(
      `Batas kuota AI tercapai (${MAX_REQUESTS_PER_WINDOW} permintaan per ${WINDOW_MINUTES} menit). Silakan coba lagi nanti.`
    );
  }
}

