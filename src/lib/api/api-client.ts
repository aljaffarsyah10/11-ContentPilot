/**
 * Standard API Client for ContentPilot
 * Native Fetch with structured response/error parsing
 */

import { ContentItem, CreateContentInput } from "@/types/content.types";
import { IdeaItem, CreateIdeaInput } from "@/types/idea.types";
import { AICaptionVariant } from "@/types/ai.types";

export interface ApiErrorResponse {
  code?: string;
  message: string;
  details?: unknown;
}

export class ApiClientError extends Error {
  code?: string;
  details?: unknown;
  status: number;

  constructor(message: string, status: number = 500, code?: string, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

interface ApiEnvelope<T> {
  success?: boolean;
  data?: T;
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
}

export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  let data: ApiEnvelope<T> | null = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = (await response.json()) as ApiEnvelope<T>;
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const errorData = data?.error;
    const message =
      errorData?.message || "Terjadi kesalahan pada server";
    throw new ApiClientError(message, response.status, errorData?.code, errorData?.details);
  }

  return (data && typeof data === "object" && "data" in data ? data.data : data) as T;
}

export const api = {
  auth: {
    register: (body: { name: string; email: string; password: string }) =>
      apiRequest<{ id: string; name: string; email: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  },
  dashboard: {
    getData: () =>
      apiRequest<{
        metrics: {
          totalContents: number;
          scheduledCount: number;
          draftCount: number;
          publishedCount: number;
          activeIdeasCount: number;
        };
        upcoming: ContentItem[];
        recentIdeas: IdeaItem[];
      }>("/api/dashboard"),
  },
  contents: {
    list: (params?: { platform?: string; status?: string; search?: string }) => {
      const q = new URLSearchParams();
      if (params?.platform && params.platform !== "ALL") q.set("platform", params.platform);
      if (params?.status && params.status !== "all" && params.status !== "ALL") {
        q.set("status", params.status);
      }
      if (params?.search) q.set("search", params.search);
      const queryStr = q.toString();
      return apiRequest<ContentItem[]>(`/api/contents${queryStr ? `?${queryStr}` : ""}`);
    },
    get: (id: string) => apiRequest<ContentItem>(`/api/contents/${id}`),
    create: (body: CreateContentInput) =>
      apiRequest<ContentItem>("/api/contents", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    update: (id: string, body: Partial<CreateContentInput>) =>
      apiRequest<ContentItem>(`/api/contents/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    delete: (id: string) =>
      apiRequest<{ deleted: boolean }>(`/api/contents/${id}`, {
        method: "DELETE",
      }),
  },
  ideas: {
    list: (params?: { status?: string; search?: string }) => {
      const q = new URLSearchParams();
      if (params?.status && params.status !== "ALL") q.set("status", params.status);
      if (params?.search) q.set("search", params.search);
      const queryStr = q.toString();
      return apiRequest<IdeaItem[]>(`/api/ideas${queryStr ? `?${queryStr}` : ""}`);
    },
    get: (id: string) => apiRequest<IdeaItem>(`/api/ideas/${id}`),
    create: (body: CreateIdeaInput) =>
      apiRequest<IdeaItem>("/api/ideas", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    update: (id: string, body: Partial<CreateIdeaInput>) =>
      apiRequest<IdeaItem>(`/api/ideas/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    delete: (id: string) =>
      apiRequest<{ deleted: boolean }>(`/api/ideas/${id}`, {
        method: "DELETE",
      }),
    convert: (id: string, body?: { platform?: string }) =>
      apiRequest<ContentItem>(`/api/ideas/${id}/convert`, {
        method: "POST",
        body: JSON.stringify(body || {}),
      }),
  },
  calendar: {
    getEvents: (params?: { startDate?: string; endDate?: string }) => {
      const q = new URLSearchParams();
      if (params?.startDate) q.set("startDate", params.startDate);
      if (params?.endDate) q.set("endDate", params.endDate);
      const queryStr = q.toString();
      return apiRequest<ContentItem[]>(`/api/calendar${queryStr ? `?${queryStr}` : ""}`);
    },
  },
  ai: {
    generateCaption: (body: {
      topic: string;
      platform: string;
      tone: string;
      language?: string;
      length?: string;
      audience?: string;
      additionalInstructions?: string;
    }) =>
      apiRequest<{
        captions: AICaptionVariant[];
        usage?: {
          totalTokens: number;
          promptTokens: number;
          completionTokens: number;
        };
      }>("/api/ai/generate-caption", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  },
};
