import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Post } from '../types';
import { RecentPostsByUser, RecentPostsState } from '../types/store';
import { useAuthStore } from './authStore';

const initialState = {
  recentPostsByUser: {} as RecentPostsByUser,
};

export const useRecentPostsStore = create(
  persist<RecentPostsState>(
    (set, get) => ({
      ...initialState,

      addRecentPost: (post: Post, userId: string) => {
        set((state) => ({
          recentPostsByUser: {
            ...state.recentPostsByUser,
            [userId || '']: [
              post,
              ...(state.recentPostsByUser[userId || ''] || []).filter(
                (p) => p.id !== post.id
              ),
            ],
          },
        }));
      },

      getRecentPosts: (userId: string) => {
        return get().recentPostsByUser[userId] || [];
      },

      clearRecentPosts: () => {
        set({ recentPostsByUser: {} });
      },
    }),
    {
      name: `recent-posts-${useAuthStore.getState().user?.id}`,
    }
  )
);
