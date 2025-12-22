import { Comment, CreateSubProps, Post, Sub, User } from '../types';

export type AuthState = {
  user: User | null;
  loading: boolean;
  mode: 'login' | 'register';
  setMode: (mode: 'login' | 'register') => void;
  login: (
    email: string,
    password: string,
    onSuccess?: () => void
  ) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
    onSuccess?: () => void
  ) => Promise<void>;
  refreshUser: () => Promise<void>;

  initAuth: () => void;
};

export type ModalKey = 'authModal' | 'createSubModal';

export type ModalState = {
  modals: Record<ModalKey, boolean>;
  open: (key: ModalKey) => void;
  close: (key: ModalKey) => void;
  toggle: (key: ModalKey) => void;
};

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

export type SortOption = '최신순' | '인기순' | '댓글 많은 순';

export type PostState = {
  posts: Post[];
  highlightPosts: Post[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  curSubId: number;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  fetchHomePosts: (isInitial?: boolean, option?: SortOption) => Promise<void>;
  fetchSubPosts: (
    id: number,
    isInitial?: boolean,
    option?: SortOption
  ) => Promise<void>;
  fetchSubHighlightPosts: (id: number) => Promise<void>;

  clearPosts: () => void;
  clearHighlightPosts: () => void;

  vote: (id: number, value: number, type: string) => Promise<void>;
  updatePostSubscribeStatus: (subId: number, isSubscribed: boolean) => void;
  updatePostCommentCount: (postId: number, isIncrease: boolean) => void;
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
  fetchComments: (
    id: number,
    isInitial?: boolean,
    option?: SortOption
  ) => Promise<void>;
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
