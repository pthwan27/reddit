import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Post } from '../types';
import { RecentPostsState } from '../types/store';

const initialState = {
  recentPosts: [] as Post[],
};

export const useRecentPostsStore = create(
  persist<RecentPostsState>(
    (set) => ({
      ...initialState,

      addRecentPost: (post: Post) => {
        set((state) => ({
          recentPosts: [post, ...state.recentPosts],
        }));
      },

      clearRecentPosts: () => {
        set({ recentPosts: [] });
      },
    }),
    {
      name: 'recent-posts-storage',
    }
  )
);
