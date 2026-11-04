import { aiProvider } from "@/lib/ai/openai.adapter";
import { checkAIRateLimit } from "@/lib/ai/rate-limiter";
import { aiGenerationRepository } from "@/repositories/ai-generation.repository";
import { GenerateCaptionDto } from "@/lib/validation/ai.schema";

export class AICaptionService {
  async generateCaptions(userId: string, input: GenerateCaptionDto) {
    // 1. Rate limiting check
    await checkAIRateLimit(userId);

    // 2. Call AI Provider
    const result = await aiProvider.generateCaptions(input);

    // 3. Log audit generation
    await aiGenerationRepository.log({
      userId,
      platform: input.platform,
      topic: input.topic,
      tone: input.tone,
      language: input.language,
      captionCount: result.captions.length,
    });

    return result;
  }
}

export const aiCaptionService = new AICaptionService();

