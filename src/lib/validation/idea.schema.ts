import { z } from "zod";
import { socialPlatformEnum } from "./content.schema";

export const ideaStatusEnum = z.enum(["NEW", "IN_PROGRESS", "USED", "ARCHIVED"]);

export const createIdeaSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Judul ide wajib diisi")
    .max(200, "Maksimal 200 karakter"),
  description: z.string().max(3000).optional().nullable(),
  status: ideaStatusEnum.default("NEW"),
});

export const updateIdeaSchema = createIdeaSchema.partial();

export const convertIdeaSchema = z.object({
  platform: socialPlatformEnum.default("INSTAGRAM"),
  title: z.string().trim().max(150).optional(),
  scheduledAt: z.string().datetime({ offset: true }).optional().nullable(),
});

export const queryIdeaSchema = z.object({
  search: z.string().optional(),
  status: ideaStatusEnum.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export type CreateIdeaDto = z.infer<typeof createIdeaSchema>;
export type UpdateIdeaDto = z.infer<typeof updateIdeaSchema>;
export type ConvertIdeaDto = z.infer<typeof convertIdeaSchema>;
export type QueryIdeaDto = z.infer<typeof queryIdeaSchema>;

