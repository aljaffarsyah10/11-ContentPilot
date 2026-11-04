import { describe, it, expect } from "vitest";
import { contentTemplates } from "@/config/templates";
import { socialPlatformEnum } from "@/lib/validation/content.schema";

describe("Unit: Content Templates Configuration", () => {
  it("should provide at least 5 default content templates", () => {
    expect(contentTemplates).toBeDefined();
    expect(contentTemplates.length).toBeGreaterThanOrEqual(5);
  });

  it("should have all required fields on every template", () => {
    for (const tmpl of contentTemplates) {
      expect(tmpl.id).toBeTruthy();
      expect(tmpl.name).toBeTruthy();
      expect(tmpl.category).toBeTruthy();
      expect(tmpl.description).toBeTruthy();
      expect(tmpl.defaultPlatform).toBeTruthy();
      expect(socialPlatformEnum.safeParse(tmpl.defaultPlatform).success).toBe(true);
      expect(tmpl.caption).toBeTruthy();
      expect(Array.isArray(tmpl.hashtags)).toBe(true);
      expect(tmpl.hashtags.length).toBeGreaterThan(0);
    }
  });

  it("should include core categories: promosi, edukasi, storytelling, pengumuman, interaksi", () => {
    const categories = contentTemplates.map((t) => t.category);
    expect(categories).toContain("promotional");
    expect(categories).toContain("educational");
    expect(categories).toContain("storytelling");
    expect(categories).toContain("announcement");
    expect(categories).toContain("engagement");
  });
});
