import { ideaRepository } from "@/repositories/idea.repository";
import { CreateIdeaDto, UpdateIdeaDto, ConvertIdeaDto, QueryIdeaDto } from "@/lib/validation/idea.schema";
import { NotFoundError } from "@/lib/error/api-error";

export class IdeaService {
  async listIdeas(userId: string, query: QueryIdeaDto) {
    const skip = (query.page - 1) * query.limit;
    const { items, total } = await ideaRepository.findMany(userId, {
      search: query.search,
      status: query.status,
      skip,
      take: query.limit,
    });

    return {
      items,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async getIdea(id: string, userId: string) {
    const idea = await ideaRepository.findById(id, userId);
    if (!idea) {
      throw new NotFoundError("Ide tidak ditemukan atau Anda tidak memiliki akses");
    }
    return idea;
  }

  async createIdea(userId: string, data: CreateIdeaDto) {
    return ideaRepository.create(userId, data);
  }

  async updateIdea(id: string, userId: string, data: UpdateIdeaDto) {
    const updated = await ideaRepository.update(id, userId, data);
    if (!updated) {
      throw new NotFoundError("Ide tidak ditemukan atau Anda tidak memiliki akses");
    }
    return updated;
  }

  async deleteIdea(id: string, userId: string) {
    const deleted = await ideaRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundError("Ide tidak ditemukan atau Anda tidak memiliki akses");
    }
    return { id: deleted.id };
  }

  async convertToContent(id: string, userId: string, params: ConvertIdeaDto) {
    const content = await ideaRepository.convertToContent(id, userId, params);
    if (!content) {
      throw new NotFoundError("Ide tidak ditemukan atau Anda tidak memiliki akses");
    }
    return content;
  }
}

export const ideaService = new IdeaService();

