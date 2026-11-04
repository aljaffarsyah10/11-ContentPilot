import { z } from "zod";
import { socialPlatformEnum } from "./content.schema";

export const captionToneEnum = z.enum([
  "casual",
  "professional",
  "humorous",
  "inspirational",
  "persuasive",
  "educational",
]);

export const captionLengthEnum = z.enum(["short", "medium", "long"]);

export const generateCaptionInputSchema = z.object({
  topic: z
    .string()
    .trim()
    .min(3, "Topik minimal 3 karakter")
    .max(300, "Topik maksimal 300 karakter"),
  platform: socialPlatformEnum.default("INSTAGRAM"),
  tone: captionToneEnum.default("casual"),
  language: z.enum(["indonesian", "english"]).default("indonesian"),
  length: captionLengthEnum.default("medium"),
  audience: z.string().trim().max(100).optional(),
  additionalInstructions: z.string().trim().max(500).optional(),
});

export type GenerateCaptionDto = z.infer<typeof generateCaptionInputSchema>;

