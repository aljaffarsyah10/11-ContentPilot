import { z } from "zod";

export const socialPlatformEnum = z.enum([
  "INSTAGRAM",
  "FACEBOOK",
  "TIKTOK",
  "LINKEDIN",
  "X",
  "YOUTUBE",
]);

export const contentStatusEnum = z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]);

export const createContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Judul konten wajib diisi")
    .max(150, "Maksimal 150 karakter"),
  caption: z.string().max(10000, "Caption maksimal 10.000 karakter").optional().nullable(),
  hashtags: z
    .array(z.string().trim().regex(/^#?[\w\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/, "Format hashtag tidak valid"))
    .default([]),
  platform: socialPlatformEnum,
  status: contentStatusEnum.default("DRAFT"),
  scheduledAt: z
    .string()
    .datetime({ offset: true })
    .optional()
    .nullable(),
  notes: z.string().max(2000).optional().nullable(),
  originIdeaId: z.string().cuid().optional().nullable(),
});

export const updateContentSchema = createContentSchema.partial();

export const queryContentSchema = z.object({
  search: z.string().optional(),
  platform: socialPlatformEnum.optional(),
  status: contentStatusEnum.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export type CreateContentDto = z.infer<typeof createContentSchema>;
export type UpdateContentDto = z.infer<typeof updateContentSchema>;
export type QueryContentDto = z.infer<typeof queryContentSchema>;

