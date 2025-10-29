import { create } from 'zustand';

import { PostStore } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

const initialState = {
  posts: [],
  loading: false,
  page: 0,
  hasMore: true,
};

export const usePostStore = create<PostStore>((set, get) => ({
  ...initialState,

  fetchPosts: async (slug: string) => {
    const { loading, page, hasMore } = get();
    if (loading || !hasMore) return;

    set({ loading: true });

    try {
      const { data } = await clientAxiosInstance.get(
        `/api/post/list/${slug}?page=${page}&limit=10`
      );

      set((state) => ({
        posts: page === 0 ? data.posts : [...state.posts, ...data.posts],
        page: state.page + 1,
        hasMore: data.posts.length > 0,
        loading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      set({ loading: false });
    }
  },

  clearPosts: () => set(initialState),
}));
