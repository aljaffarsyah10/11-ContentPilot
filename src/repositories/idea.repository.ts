import { prisma } from "@/lib/db/prisma";
import { Prisma, IdeaStatus, SocialPlatform } from "@prisma/client";
import { CreateIdeaDto, UpdateIdeaDto } from "@/lib/validation/idea.schema";

export class IdeaRepository {
  async findMany(
    userId: string,
    params: {
      search?: string;
      status?: IdeaStatus;
      skip?: number;
      take?: number;
    }
  ) {
    const where: Prisma.ContentIdeaWhereInput = {
      userId,
      ...(params.status ? { status: params.status } : {}),
      ...(params.search
        ? {
            OR: [
              { title: { contains: params.search, mode: "insensitive" } },
              { description: { contains: params.search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.contentIdea.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: params.skip,
        take: params.take,
      }),
      prisma.contentIdea.count({ where }),
    ]);

    return { items, total };
  }

  async findById(id: string, userId: string) {
    return prisma.contentIdea.findFirst({
      where: { id, userId },
    });
  }

  async create(userId: string, data: CreateIdeaDto) {
    return prisma.contentIdea.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        status: data.status,
      },
    });
  }

  async update(id: string, userId: string, data: UpdateIdeaDto) {
    const existing = await this.findById(id, userId);
    if (!existing) return null;

    return prisma.contentIdea.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
      },
    });
  }

  async delete(id: string, userId: string) {
    const existing = await this.findById(id, userId);
    if (!existing) return null;

    return prisma.contentIdea.delete({
      where: { id },
    });
  }

  async convertToContent(
    ideaId: string,
    userId: string,
    params: {
      platform: SocialPlatform;
      title?: string;
      scheduledAt?: string | null;
    }
  ) {
    const idea = await this.findById(ideaId, userId);
    if (!idea) return null;

    // Execute atomic transaction: Create content + Mark idea as USED
    return prisma.$transaction(async (tx) => {
      const createdContent = await tx.content.create({
        data: {
          userId,
          title: params.title || idea.title,
          caption: idea.description,
          platform: params.platform,
          status: "DRAFT",
          scheduledAt: params.scheduledAt ? new Date(params.scheduledAt) : null,
          originIdeaId: idea.id,
          notes: `Dikonversi dari ide: ${idea.title}`,
        },
      });

      await tx.contentIdea.update({
        where: { id: idea.id },
        data: { status: "USED" },
      });

      return createdContent;
    });
  }

  async findRecent(userId: string, limit: number = 3) {
    return prisma.contentIdea.findMany({
      where: {
        userId,
        status: { in: ["NEW", "IN_PROGRESS"] },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}

export const ideaRepository = new IdeaRepository();

