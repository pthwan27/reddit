import { CreateSubProps, Post, Sub } from '../types';

export type SubState = {
  subs: Sub[];
  filteredSubs: Sub[];
  selectedSub: Sub | null;
  loading: boolean;
  getMySubs: () => Promise<void>;
  setSelectedSub: (sub: Sub | null) => void;
  reset: () => void;
  createSub: (subData: CreateSubProps) => Promise<void>;

  _hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
};

export type PostStore = {
  posts: Post[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  selectedPost: Post | null;
  curSubSlug: string;
  setSelectedPost: (post: Post | null) => void;
  fetchPosts: (slug: string, isInitial?: boolean) => Promise<void>;
  clearPosts: () => void;
  vote: (identifier: string, slug: string, value: number) => Promise<void>;
};

export type CommentStore = {
  comments: Comment[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  curPostSlug: string;
  fetchComments: (slug: string, isInitial?: boolean) => Promise<void>;
  clearComments: () => void;
  vote: (identifier: string, slug: string, value: number) => Promise<void>;
};
