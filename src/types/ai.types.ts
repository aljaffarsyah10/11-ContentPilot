import { SocialPlatform } from "@/components/shared/platform-badge";

export type CaptionTone =
  | "casual"
  | "professional"
  | "humorous"
  | "inspirational"
  | "persuasive"
  | "educational";

export type CaptionLength = "short" | "medium" | "long";

export interface AICaptionInput {
  topic: string;
  platform: SocialPlatform;
  tone: CaptionTone;
  language: "indonesian" | "english";
  length: CaptionLength;
  audience?: string;
  additionalInstructions?: string;
}

export interface AICaptionVariant {
  id: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
}

export interface AICaptionResult {
  captions: AICaptionVariant[];
}

