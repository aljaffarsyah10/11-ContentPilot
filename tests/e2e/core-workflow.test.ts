import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { contentService } from "@/services/content.service";
import { ideaService } from "@/services/idea.service";
import { calendarService } from "@/services/calendar.service";
import { dashboardService } from "@/services/dashboard.service";

describe("E2E: Full Application Core Workflow", () => {
  let testUser: { id: string; email: string; name: string | null };
  const timestamp = Date.now();
  const testEmail = `e2e_flow_${timestamp}@example.com`;
  const testPassword = "securePassword123#";

  beforeAll(async () => {
    // 1. User Registration with bcrypt hash
    const passwordHash = await bcrypt.hash(testPassword, 12);
    testUser = await prisma.user.create({
      data: {
        name: "E2E Workflow User",
        email: testEmail,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  });

  afterAll(async () => {
    // Cleanup
    await prisma.content.deleteMany({ where: { userId: testUser.id } });
    await prisma.contentIdea.deleteMany({ where: { userId: testUser.id } });
    await prisma.user.deleteMany({ where: { id: testUser.id } });
  });

  it("Step 1: User registered successfully with properly hashed password", async () => {
    expect(testUser.id).toBeDefined();
    expect(testUser.email).toBe(testEmail);

    const dbUser = await prisma.user.findUnique({ where: { id: testUser.id } });
    expect(dbUser?.passwordHash).not.toBe(testPassword);
    expect(dbUser?.passwordHash?.startsWith("$2")).toBe(true);
  });

  it("Step 2: User can create a draft content", async () => {
    const content = await contentService.createContent(testUser.id, {
      title: "Rilis Fitur Baru ContentPilot",
      caption: "Kami sangat bersemangat mengumumkan fitur baru...",
      hashtags: ["contentpilot", "productlaunch", "saas"],
      platform: "LINKEDIN",
      status: "DRAFT",
    });

    expect(content.id).toBeDefined();
    expect(content.title).toBe("Rilis Fitur Baru ContentPilot");
    expect(content.status).toBe("DRAFT");
    expect(content.platform).toBe("LINKEDIN");
  });

  it("Step 3: User can create an idea backlog item", async () => {
    const idea = await ideaService.createIdea(testUser.id, {
      title: "Ide Konten: 5 Kesalahan Kreator Pemula",
      description: "Membahas konsistensi, hook, dan engagement rate",
      status: "NEW",
    });

    expect(idea.id).toBeDefined();
    expect(idea.status).toBe("NEW");
  });

  it("Step 4: User can convert an idea into planned content", async () => {
    const idea = await ideaService.createIdea(testUser.id, {
      title: "Ide untuk Dikonversi",
      description: "Catatan visual",
      status: "NEW",
    });

    const scheduledDate = new Date(Date.now() + 86400000).toISOString();
    const converted = await ideaService.convertToContent(idea.id, testUser.id, {
      platform: "TIKTOK",
      title: "Konten Hasil Konversi",
      scheduledAt: scheduledDate,
    });

    expect(converted.id).toBeDefined();
    expect(converted.platform).toBe("TIKTOK");
    expect(converted.originIdeaId).toBe(idea.id);

    // Verify idea marked as USED
    const updatedIdea = await ideaService.getIdea(idea.id, testUser.id);
    expect(updatedIdea.status).toBe("USED");
  });

  it("Step 5: User can schedule content and see it on the calendar", async () => {
    const scheduleDate = new Date();
    scheduleDate.setDate(scheduleDate.getDate() + 5);

    const content = await contentService.createContent(testUser.id, {
      title: "Jadwal Tayang Khusus Kalender",
      caption: "Konten siap tayang di Instagram",
      hashtags: ["calendar", "schedule"],
      platform: "INSTAGRAM",
      status: "SCHEDULED",
      scheduledAt: scheduleDate.toISOString(),
    });

    expect(content.status).toBe("SCHEDULED");

    // Fetch calendar events
    const year = scheduleDate.getFullYear();
    const month = scheduleDate.getMonth() + 1;
    // Build start/end date range for the month
    const startDate = new Date(year, month - 1, 1).toISOString();
    const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();
    const calendarEvents = await calendarService.getCalendarEvents(testUser.id, {
      startDate,
      endDate,
    });

    const found = calendarEvents.find((e) => e.id === content.id);
    expect(found).toBeDefined();
    expect(found?.title).toBe("Jadwal Tayang Khusus Kalender");
  });

  it("Step 6: User can duplicate content and verify status resets to DRAFT", async () => {
    const original = await contentService.createContent(testUser.id, {
      title: "Post Promosi Diskon 50%",
      caption: "Gunakan kupon HEMAT50 untuk potongan harga!",
      hashtags: ["diskon", "promo"],
      platform: "FACEBOOK",
      status: "PUBLISHED",
      scheduledAt: new Date().toISOString(),
      notes: "Promo akhir tahun",
    });

    const duplicated = await contentService.duplicateContent(original.id, testUser.id);
    expect(duplicated.id).not.toBe(original.id);
    expect(duplicated.status).toBe("DRAFT");
    expect(duplicated.scheduledAt).toBeNull();
    expect(duplicated.caption).toBe(original.caption);
    expect(duplicated.platform).toBe("FACEBOOK");
    expect(duplicated.notes).toBe(original.notes);
  });

  it("Step 7: User can export contents to CSV with RFC 4180 format and UTF-8 BOM", async () => {
    const csv = await contentService.exportContentsCsv(testUser.id);

    expect(csv.startsWith("\uFEFF")).toBe(true);
    expect(csv.includes("Title,Platform,Caption,Hashtags,Status,Scheduled Date,Created Date")).toBe(
      true
    );
    expect(csv.includes("Post Promosi Diskon 50%")).toBe(true);
  });

  it("Step 8: Dashboard metrics reflect user's real contents count", async () => {
    const dashboardData = await dashboardService.getDashboardData(testUser.id);

    expect(dashboardData.metrics).toBeDefined();
    expect(dashboardData.metrics.totalContents).toBeGreaterThanOrEqual(3);
    expect(Array.isArray(dashboardData.upcoming)).toBe(true);
  });
});
