export type ValidationRule = {
  condition: boolean;
  message: string;
};

export type SubVisibility = 'public' | 'restricted' | 'private';

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
  profileUrl: string;
}

export interface Sub {
  id: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  tags: string[];
  visibility: SubVisibility;
  title: string;
  description: string | null;
  iconUrl: string;
  bannerUrl: string;
  username: string;
  isSubscribed: boolean;
  isOwner: boolean;
  subscriberCount: number;
  postCount: number;
  posts?: Post[];
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
  userVote: number;
  postType: 'text' | 'media' | 'link';
  mediaType?: 'image' | 'video' | null;
  imageUrls?: string[];
  videoUrl?: string;
  linkUrl?: string;
  sub: Sub;
  user: User;
  comments: Comment[];
}
export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  body: string;
  postId: number;
  username: string;
  userProfileUrl: string;
  voteScore: number;
  userVote: number;
  commentCount: number;
  childComments: Comment[];
}

export interface CreateSubProps {
  tags: string[];
  visibility: SubVisibility;
  title: string;
  description: string;
  icon?: File | null;
  banner?: File | null;
  iconPreview?: string | null;
  bannerPreview?: string | null;
  username: string;
}

export interface ChangeSubProps {
  slug: string;
  icon?: File | null;
  banner?: File | null;
}
