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
  profileUser: User | null;
  posts?: Post[];
}
export interface CreateSubProps {
  title: string;
  description: string;
  icon?: File | null;
  banner?: File | null;
  iconPreview?: string | null;
  bannerPreview?: string | null;
}

export interface ChangeSubProps {
  slug: string;
  icon?: File | null;
  banner?: File | null;
}

export interface SubmitPostProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
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
