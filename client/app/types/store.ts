import { Comment, CreateSubProps, Post, Sub } from '../types';

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
  curSubId: number;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  fetchPosts: (id: number, isInitial?: boolean) => Promise<void>;
  clearPosts: () => void;
  vote: (id: number, value: number, type: string) => Promise<void>;
};

export type CommentStore = {
  comments: Comment[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  curPostId: number;
  fetchComments: (id: number, isInitial?: boolean) => Promise<void>;
  clearComments: () => void;
  vote: (id: number, value: number, type: string) => Promise<void>;
};
