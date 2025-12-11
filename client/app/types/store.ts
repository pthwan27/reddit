import { Comment, CreateSubProps, Post, Sub } from '../types';

export type SubState = {
  subs: Sub[];
  selectedSub: Sub | null;
  loading: boolean;
  getMySubs: () => Promise<void>;
  setSelectedSub: (sub: Sub | null) => void;
  createSub: (subData: CreateSubProps) => Promise<void>;
  handleSubscribe: (sub: Sub) => Promise<boolean>;
  _hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  reset: () => void;
};

export type PostState = {
  posts: Post[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  curSubId: number;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  fetchHomePosts: (isInitial?: boolean) => Promise<void>;
  fetchSubPosts: (id: number, isInitial?: boolean) => Promise<void>;
  clearPosts: () => void;
  vote: (id: number, value: number, type: string) => Promise<void>;
  updatePostSubscribeStatus: (subId: number, isSubscribed: boolean) => void;
  reset: () => void;
};

export type CommentState = {
  comments: Comment[];
  loading: boolean;
  submitting: boolean;
  page: number;
  hasMore: boolean;
  curPostId: number;
  submitComment: (
    id: number,
    content: string,
    type: 'post' | 'comment'
  ) => Promise<void>;
  fetchComments: (id: number, isInitial?: boolean) => Promise<void>;
  clearComments: () => void;
  vote: (id: number, value: number, type: string) => Promise<void>;
};

export type UIState = {
  leftNavVisible: boolean;
  toggleLeftNav: () => void;
  leftNavByHeaderVisible: boolean;
  toggleLeftNavByHeader: () => void;
  setLeftNavByHeaderVisible: (visible: boolean) => void;
};
