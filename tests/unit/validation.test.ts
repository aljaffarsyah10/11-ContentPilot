import { describe, it, expect } from "vitest";
import {
  createContentSchema,
  updateContentSchema,
  socialPlatformEnum,
  contentStatusEnum,
} from "@/lib/validation/content.schema";
import {
  createIdeaSchema,
  convertIdeaSchema,
} from "@/lib/validation/idea.schema";
import { registerSchema, loginSchema } from "@/lib/validation/auth.schema";
import { generateCaptionInputSchema } from "@/lib/validation/ai.schema";

describe("Unit: Content Validation Schema", () => {
  it("should validate a valid content creation payload", () => {
    const input = {
      title: "10 Tips Produktivitas Kreator",
      caption: "Simak tips berikut untuk meningkatkan konsistensi konten Anda.",
      hashtags: ["produktivitas", "tips", "kreator"],
      platform: "INSTAGRAM",
      status: "DRAFT",
      scheduledAt: "2026-12-01T10:00:00.000Z",
      notes: "Pastikan visual carousel sudah siap",
    };

    const parsed = createContentSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.title).toBe("10 Tips Produktivitas Kreator");
      expect(parsed.data.platform).toBe("INSTAGRAM");
    }
  });

  it("should reject an empty title", () => {
    const input = {
      title: "   ",
      platform: "INSTAGRAM",
    };

    const parsed = createContentSchema.safeParse(input);
    expect(parsed.success).toBe(false);
  });

  it("should reject title exceeding 150 characters", () => {
    const input = {
      title: "a".repeat(151),
      platform: "LINKEDIN",
    };

    const parsed = createContentSchema.safeParse(input);
    expect(parsed.success).toBe(false);
  });

  it("should validate all allowed social platforms", () => {
    const platforms = ["INSTAGRAM", "FACEBOOK", "TIKTOK", "LINKEDIN", "X", "YOUTUBE"];
    for (const p of platforms) {
      const parsed = socialPlatformEnum.safeParse(p);
      expect(parsed.success).toBe(true);
    }

    const invalid = socialPlatformEnum.safeParse("MYSPACE");
    expect(invalid.success).toBe(false);
  });

  it("should validate content status enum", () => {
    expect(contentStatusEnum.safeParse("DRAFT").success).toBe(true);
    expect(contentStatusEnum.safeParse("SCHEDULED").success).toBe(true);
    expect(contentStatusEnum.safeParse("PUBLISHED").success).toBe(true);
    expect(contentStatusEnum.safeParse("CANCELLED").success).toBe(false);
  });

  it("should allow partial update schema", () => {
    const updateInput = {
      status: "PUBLISHED" as const,
    };
    const parsed = updateContentSchema.safeParse(updateInput);
    expect(parsed.success).toBe(true);
  });
});

describe("Unit: Idea Validation Schema", () => {
  it("should validate a valid idea creation payload", () => {
    const input = {
      title: "Ide Konten AI untuk UMKM",
      description: "Membahas 5 tools AI gratis yang membantu promosi UMKM",
      status: "NEW",
    };

    const parsed = createIdeaSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.title).toBe("Ide Konten AI untuk UMKM");
      expect(parsed.data.status).toBe("NEW");
    }
  });

  it("should reject empty idea title", () => {
    const input = { title: "" };
    const parsed = createIdeaSchema.safeParse(input);
    expect(parsed.success).toBe(false);
  });

  it("should validate convert idea schema with default platform", () => {
    const parsed = convertIdeaSchema.safeParse({});
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.platform).toBe("INSTAGRAM");
    }
  });
});

describe("Unit: AI Caption Generation Schema", () => {
  it("should validate a valid AI prompt input with default options", () => {
    const input = {
      topic: "Tips Memulai Bisnis Kopi Susu Modal Kecil",
    };

    const parsed = generateCaptionInputSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.platform).toBe("INSTAGRAM");
      expect(parsed.data.tone).toBe("casual");
      expect(parsed.data.language).toBe("indonesian");
      expect(parsed.data.length).toBe("medium");
    }
  });

  it("should reject topic shorter than 3 characters", () => {
    const input = { topic: "ab" };
    const parsed = generateCaptionInputSchema.safeParse(input);
    expect(parsed.success).toBe(false);
  });

  it("should reject invalid tone option", () => {
    const input = {
      topic: "Valid Topic",
      tone: "angry",
    };
    const parsed = generateCaptionInputSchema.safeParse(input);
    expect(parsed.success).toBe(false);
  });
});

describe("Unit: Auth Validation Schema", () => {
  it("should accept valid registration input and normalize email to lowercase", () => {
    const input = {
      name: "Budi Santoso",
      email: "BUDI.SANTOSO@Example.COM",
      password: "password123#",
    };

    const parsed = registerSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.email).toBe("budi.santoso@example.com");
    }
  });

  it("should reject password less than 8 characters", () => {
    const input = {
      name: "Budi",
      email: "budi@example.com",
      password: "short",
    };

    const parsed = registerSchema.safeParse(input);
    expect(parsed.success).toBe(false);
  });

  it("should reject invalid email format", () => {
    const input = {
      email: "not-an-email",
      password: "password123",
    };

    const parsed = loginSchema.safeParse(input);
    expect(parsed.success).toBe(false);
  });
});
