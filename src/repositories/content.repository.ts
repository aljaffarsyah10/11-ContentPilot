import { prisma } from "@/lib/db/prisma";
import { Prisma, SocialPlatform, ContentStatus } from "@prisma/client";
import { CreateContentDto, UpdateContentDto } from "@/lib/validation/content.schema";

export class ContentRepository {
  async findMany(
    userId: string,
    params: {
      search?: string;
      platform?: SocialPlatform;
      status?: ContentStatus;
      skip?: number;
      take?: number;
    }
  ) {
    const where: Prisma.ContentWhereInput = {
      userId,
      ...(params.platform ? { platform: params.platform } : {}),
      ...(params.status ? { status: params.status } : {}),
      ...(params.search
        ? {
            OR: [
              { title: { contains: params.search, mode: "insensitive" } },
              { caption: { contains: params.search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.content.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: params.skip,
        take: params.take,
      }),
      prisma.content.count({ where }),
    ]);

    return { items, total };
  }

  async findById(id: string, userId: string) {
    return prisma.content.findFirst({
      where: { id, userId },
      include: {
        originIdea: true,
      },
    });
  }

  async create(userId: string, data: CreateContentDto) {
    return prisma.content.create({
      data: {
        userId,
        title: data.title,
        caption: data.caption,
        hashtags: data.hashtags,
        platform: data.platform,
        status: data.status,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        notes: data.notes,
        originIdeaId: data.originIdeaId,
      },
    });
  }

  async update(id: string, userId: string, data: UpdateContentDto) {
    // Check ownership first
    const existing = await this.findById(id, userId);
    if (!existing) return null;

    return prisma.content.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.caption !== undefined ? { caption: data.caption } : {}),
        ...(data.hashtags !== undefined ? { hashtags: data.hashtags } : {}),
        ...(data.platform !== undefined ? { platform: data.platform } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.scheduledAt !== undefined
          ? { scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null }
          : {}),
        ...(data.notes !== undefined ? { notes: data.notes } : {}),
      },
    });
  }

  async delete(id: string, userId: string) {
    const existing = await this.findById(id, userId);
    if (!existing) return null;

    return prisma.content.delete({
      where: { id },
    });
  }

  async findUpcoming(userId: string, limit: number = 5) {
    return prisma.content.findMany({
      where: {
        userId,
        status: "SCHEDULED",
        scheduledAt: { gte: new Date() },
      },
      orderBy: { scheduledAt: "asc" },
      take: limit,
    });
  }

  async findCalendarEvents(userId: string, startDate?: Date, endDate?: Date) {
    const where: Prisma.ContentWhereInput = {
      userId,
      scheduledAt: { not: null },
      ...(startDate || endDate
        ? {
            scheduledAt: {
              ...(startDate ? { gte: startDate } : {}),
              ...(endDate ? { lte: endDate } : {}),
            },
          }
        : {}),
    };

    return prisma.content.findMany({
      where,
      orderBy: { scheduledAt: "asc" },
    });
  }

  async duplicate(id: string, userId: string) {
    const original = await this.findById(id, userId);
    if (!original) return null;

    return prisma.content.create({
      data: {
        userId,
        title: `${original.title} (Salinan)`,
        caption: original.caption,
        hashtags: original.hashtags,
        platform: original.platform,
        status: "DRAFT",
        scheduledAt: null,
        notes: original.notes,
        originIdeaId: original.originIdeaId,
      },
    });
  }

  async findAllForExport(userId: string) {
    return prisma.content.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const contentRepository = new ContentRepository();

