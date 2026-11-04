import { contentRepository } from "@/repositories/content.repository";
import { CreateContentDto, UpdateContentDto, QueryContentDto } from "@/lib/validation/content.schema";
import { NotFoundError, ValidationError } from "@/lib/error/api-error";

export class ContentService {
  async listContents(userId: string, query: QueryContentDto) {
    const skip = (query.page - 1) * query.limit;
    const { items, total } = await contentRepository.findMany(userId, {
      search: query.search,
      platform: query.platform,
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

  async getContent(id: string, userId: string) {
    const content = await contentRepository.findById(id, userId);
    if (!content) {
      throw new NotFoundError("Konten tidak ditemukan atau Anda tidak memiliki akses");
    }
    return content;
  }

  async createContent(userId: string, data: CreateContentDto) {
    // Validate business rule: Scheduled status requires future scheduledAt
    if (data.status === "SCHEDULED" && !data.scheduledAt) {
      throw new ValidationError("Jadwal waktu tayang wajib diisi untuk status SCHEDULED");
    }

    return contentRepository.create(userId, data);
  }

  async updateContent(id: string, userId: string, data: UpdateContentDto) {
    if (data.status === "SCHEDULED" && data.scheduledAt === null) {
      throw new ValidationError("Jadwal tayang tidak boleh dikosongkan untuk status SCHEDULED");
    }

    const updated = await contentRepository.update(id, userId, data);
    if (!updated) {
      throw new NotFoundError("Konten tidak ditemukan atau Anda tidak memiliki akses");
    }
    return updated;
  }

  async deleteContent(id: string, userId: string) {
    const deleted = await contentRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundError("Konten tidak ditemukan atau Anda tidak memiliki akses");
    }
    return { id: deleted.id };
  }

  async duplicateContent(id: string, userId: string) {
    const duplicated = await contentRepository.duplicate(id, userId);
    if (!duplicated) {
      throw new NotFoundError("Konten tidak ditemukan atau Anda tidak memiliki akses");
    }
    return duplicated;
  }

  async exportContentsCsv(userId: string): Promise<string> {
    const contents = await contentRepository.findAllForExport(userId);
    const headers = [
      "Title",
      "Platform",
      "Caption",
      "Hashtags",
      "Status",
      "Scheduled Date",
      "Created Date",
    ];

    const escapeCsvValue = (val: string | null | undefined): string => {
      if (val === null || val === undefined) return "";
      const str = String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = contents.map((c) => [
      escapeCsvValue(c.title),
      escapeCsvValue(c.platform),
      escapeCsvValue(c.caption),
      escapeCsvValue(c.hashtags.map((h) => `#${h}`).join(" ")),
      escapeCsvValue(c.status),
      escapeCsvValue(c.scheduledAt ? c.scheduledAt.toISOString() : ""),
      escapeCsvValue(c.createdAt.toISOString()),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    return "\uFEFF" + csvContent;
  }
}

export const contentService = new ContentService();

