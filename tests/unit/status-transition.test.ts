import { describe, it, expect } from "vitest";
import { contentService } from "@/services/content.service";
import { ValidationError } from "@/lib/error/api-error";

describe("Unit: Status Transitions & Scheduling Rules", () => {
  it("should disallow SCHEDULED status without a scheduledAt date on createContent", async () => {
    const invalidPayload = {
      title: "Konten Dijadwalkan Tanpa Tanggal",
      hashtags: [] as string[],
      platform: "INSTAGRAM" as const,
      status: "SCHEDULED" as const,
      scheduledAt: null,
    };

    await expect(
      contentService.createContent("dummy-user-id", invalidPayload)
    ).rejects.toThrow(ValidationError);
  });

  it("should disallow clearing scheduledAt when status is SCHEDULED on updateContent", async () => {
    const invalidUpdate = {
      status: "SCHEDULED" as const,
      scheduledAt: null,
    };

    await expect(
      contentService.updateContent("dummy-content-id", "dummy-user-id", invalidUpdate)
    ).rejects.toThrow(ValidationError);
  });
});

