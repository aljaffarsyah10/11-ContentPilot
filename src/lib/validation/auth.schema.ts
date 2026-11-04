import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Nama lengkap minimal 2 karakter").max(100, "Maksimal 100 karakter"),
  email: z.string().trim().email("Format email tidak valid").toLowerCase(),
  password: z.string().min(8, "Kata sandi minimal 8 karakter").max(100, "Maksimal 100 karakter"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Format email tidak valid").toLowerCase(),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

