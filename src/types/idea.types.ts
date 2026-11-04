import { IdeaStatus } from "@/components/shared/status-badge";

export interface IdeaItem {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  status: IdeaStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIdeaInput {
  title: string;
  description?: string | null;
  status?: IdeaStatus;
}

