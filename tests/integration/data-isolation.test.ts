import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma } from "@/lib/db/prisma";
import { contentService } from "@/services/content.service";
import { ideaService } from "@/services/idea.service";
import { NotFoundError } from "@/lib/error/api-error";

describe("Integration: Data Ownership & Multi-Tenant Isolation", () => {
  let userAId: string;
  let userBId: string;
  let userAContentId: string;
  let userAIdeaId: string;

  beforeAll(async () => {
    // Setup two distinct users
    const timestamp = Date.now();
    const userA = await prisma.user.create({
      data: {
        name: "User Alpha",
        email: `alpha_${timestamp}@example.com`,
        passwordHash: "dummyHashA",
      },
    });
    userAId = userA.id;

    const userB = await prisma.user.create({
      data: {
        name: "User Beta",
        email: `beta_${timestamp}@example.com`,
        passwordHash: "dummyHashB",
      },
    });
    userBId = userB.id;
  });

  afterAll(async () => {
    // Clean up created resources
    await prisma.content.deleteMany({
      where: { userId: { in: [userAId, userBId] } },
    });
    await prisma.contentIdea.deleteMany({
      where: { userId: { in: [userAId, userBId] } },
    });
    await prisma.user.deleteMany({
      where: { id: { in: [userAId, userBId] } },
    });
  });

  it("User A can create content successfully", async () => {
    const content = await contentService.createContent(userAId, {
      title: "Private Content of User Alpha",
      caption: "Super secret marketing plan",
      hashtags: [],
      platform: "LINKEDIN",
      status: "DRAFT",
    });

    expect(content.id).toBeDefined();
    expect(content.userId).toBe(userAId);
    userAContentId = content.id;
  });

  it("User B cannot read User A's content (NotFoundError/Isolation)", async () => {
    await expect(contentService.getContent(userAContentId, userBId)).rejects.toThrow(
      NotFoundError
    );
  });

  it("User B cannot update User A's content", async () => {
    await expect(
      contentService.updateContent(userAContentId, userBId, {
        title: "Hacked by User Beta",
      })
    ).rejects.toThrow(NotFoundError);
  });

  it("User B cannot duplicate User A's content", async () => {
    await expect(
      contentService.duplicateContent(userAContentId, userBId)
    ).rejects.toThrow(NotFoundError);
  });

  it("User B cannot delete User A's content", async () => {
    await expect(
      contentService.deleteContent(userAContentId, userBId)
    ).rejects.toThrow(NotFoundError);
  });

  it("User A can create an idea successfully", async () => {
    const idea = await ideaService.createIdea(userAId, {
      title: "Secret Startup Idea of Alpha",
      description: "AI-powered coffee machine",
      status: "NEW",
    });

    expect(idea.id).toBeDefined();
    expect(idea.userId).toBe(userAId);
    userAIdeaId = idea.id;
  });

  it("User B cannot read User A's idea", async () => {
    await expect(ideaService.getIdea(userAIdeaId, userBId)).rejects.toThrow(NotFoundError);
  });

  it("User B cannot update User A's idea", async () => {
    await expect(
      ideaService.updateIdea(userAIdeaId, userBId, {
        title: "Stolen idea by Beta",
      })
    ).rejects.toThrow(NotFoundError);
  });

  it("User B cannot convert User A's idea to content", async () => {
    await expect(
      ideaService.convertToContent(userAIdeaId, userBId, {
        platform: "INSTAGRAM",
      })
    ).rejects.toThrow(NotFoundError);
  });

  it("User B cannot delete User A's idea", async () => {
    await expect(
      ideaService.deleteIdea(userAIdeaId, userBId)
    ).rejects.toThrow(NotFoundError);
  });

  it("CSV Export for User B should NOT include User A's content", async () => {
    const csvForB = await contentService.exportContentsCsv(userBId);
    expect(csvForB.includes("Private Content of User Alpha")).toBe(false);
  });
});
