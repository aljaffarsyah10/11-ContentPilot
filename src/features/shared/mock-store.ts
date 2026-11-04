"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ContentItem, CreateContentInput } from "@/types/content.types";
import { IdeaItem, CreateIdeaInput } from "@/types/idea.types";
import { getMockContents } from "@/features/contents/mocks/content.mock";
import { getMockIdeas } from "@/features/ideas/mocks/idea.mock";

interface MockStoreState {
  contents: ContentItem[];
  ideas: IdeaItem[];

  // Content Actions
  addContent: (input: CreateContentInput) => ContentItem;
  updateContent: (id: string, input: Partial<CreateContentInput>) => ContentItem | null;
  deleteContent: (id: string) => boolean;
  getContentById: (id: string) => ContentItem | undefined;

  // Idea Actions
  addIdea: (input: CreateIdeaInput) => IdeaItem;
  updateIdea: (id: string, input: Partial<CreateIdeaInput>) => IdeaItem | null;
  deleteIdea: (id: string) => boolean;
  convertIdeaToContent: (ideaId: string, input?: Partial<CreateContentInput>) => ContentItem | null;

  // Reset helper
  resetToMock: () => void;
}

export const useMockStore = create<MockStoreState>()(
  persist(
    (set, get) => ({
      contents: getMockContents(),
      ideas: getMockIdeas(),

      addContent: (input: CreateContentInput) => {
        const newContent: ContentItem = {
          id: `cnt-${Date.now()}`,
          userId: "usr-demo",
          title: input.title,
          caption: input.caption || null,
          hashtags: input.hashtags || [],
          platform: input.platform,
          status: input.status,
          scheduledAt: input.scheduledAt || null,
          notes: input.notes || null,
          originIdeaId: input.originIdeaId || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          contents: [newContent, ...state.contents],
        }));

        return newContent;
      },

      updateContent: (id: string, input: Partial<CreateContentInput>) => {
        let updatedItem: ContentItem | null = null;

        set((state) => ({
          contents: state.contents.map((item) => {
            if (item.id === id) {
              updatedItem = {
                ...item,
                ...input,
                updatedAt: new Date().toISOString(),
              };
              return updatedItem;
            }
            return item;
          }),
        }));

        return updatedItem;
      },

      deleteContent: (id: string) => {
        const exists = get().contents.some((c) => c.id === id);
        if (!exists) return false;

        set((state) => ({
          contents: state.contents.filter((c) => c.id !== id),
        }));
        return true;
      },

      getContentById: (id: string) => {
        return get().contents.find((c) => c.id === id);
      },

      addIdea: (input: CreateIdeaInput) => {
        const newIdea: IdeaItem = {
          id: `ida-${Date.now()}`,
          userId: "usr-demo",
          title: input.title,
          description: input.description || null,
          status: input.status || "NEW",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          ideas: [newIdea, ...state.ideas],
        }));

        return newIdea;
      },

      updateIdea: (id: string, input: Partial<CreateIdeaInput>) => {
        let updatedIdea: IdeaItem | null = null;

        set((state) => ({
          ideas: state.ideas.map((item) => {
            if (item.id === id) {
              updatedIdea = {
                ...item,
                ...input,
                updatedAt: new Date().toISOString(),
              };
              return updatedIdea;
            }
            return item;
          }),
        }));

        return updatedIdea;
      },

      deleteIdea: (id: string) => {
        const exists = get().ideas.some((i) => i.id === id);
        if (!exists) return false;

        set((state) => ({
          ideas: state.ideas.filter((i) => i.id !== id),
        }));
        return true;
      },

      convertIdeaToContent: (ideaId: string, input?: Partial<CreateContentInput>) => {
        const idea = get().ideas.find((i) => i.id === ideaId);
        if (!idea) return null;

        // Create new content from idea
        const newContent: ContentItem = {
          id: `cnt-${Date.now()}`,
          userId: "usr-demo",
          title: input?.title || idea.title,
          caption: input?.caption || idea.description || null,
          hashtags: input?.hashtags || [],
          platform: input?.platform || "INSTAGRAM",
          status: input?.status || "DRAFT",
          scheduledAt: input?.scheduledAt || null,
          notes: `Dikonversi dari ide: ${idea.title}`,
          originIdeaId: idea.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          contents: [newContent, ...state.contents],
          ideas: state.ideas.map((i) =>
            i.id === ideaId ? { ...i, status: "USED", updatedAt: new Date().toISOString() } : i
          ),
        }));

        return newContent;
      },

      resetToMock: () => {
        set({
          contents: getMockContents(),
          ideas: getMockIdeas(),
        });
      },
    }),
    {
      name: "contentpilot-mock-storage",
    }
  )
);

