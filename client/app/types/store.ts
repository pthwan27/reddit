import { CreateSubProps, Post, Sub } from '../types';

export type SubState = {
  subs: Sub[];
  filteredSubs: Sub[];
  selectedSub: Sub | null;
  loading: boolean;
  getMySubs: () => Promise<void>;
  addOptimisticSub: (newSub: Sub) => void;
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
  fetchPosts: (slug: string) => Promise<void>;
  clearPosts: () => void;
};
