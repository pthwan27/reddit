export type ValidationRule = {
  condition: boolean;
  message: string;
};

export interface CustomError extends Error {
  response?: {
    data?: { error?: string };
    status?: number;
  };
}
export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Sub {
  id: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  title: string;
  description: string | null;
  iconUrl: string;
  bannerUrl: string;
  username: string;
  posts?: Post[];
}
export interface CreateSubProps {
  slug: string;
  title: string;
  description: string;
  icon?: File | null;
  banner?: File | null;
}

export interface ChangeSubProps {
  id: number;
  icon?: File | null;
  banner?: File | null;
}
// Post 타입
export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  title: string;
  slug: string;
  body: string;
  subName: string;
  username: string;
  url: string;
  voteScore: number;
  commentCount: number;
  userVote?: number;
  sub?: Sub;
}
