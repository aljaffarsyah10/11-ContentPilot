import { GenerateCaptionDto } from "@/lib/validation/ai.schema";

export interface GeneratedCaptionVariant {
  id: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
}

export interface CaptionGenerationResult {
  captions: GeneratedCaptionVariant[];
  usage?: {
    totalTokens: number;
    promptTokens: number;
    completionTokens: number;
  };
}

export interface AIProvider {
  generateCaptions(input: GenerateCaptionDto): Promise<CaptionGenerationResult>;
}

