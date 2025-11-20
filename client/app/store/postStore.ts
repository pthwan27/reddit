import { create } from 'zustand';

import { Post } from '../types';
import { PostStore } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

const initialState = {
  posts: [] as Post[],
  loading: false,
  page: 0,
  hasMore: true,
  curSubSlug: '',
};

export const usePostStore = create<PostStore>((set, get) => ({
  ...initialState,

  fetchPosts: async (slug: string) => {
    const { loading, page, hasMore, curSubSlug } = get();
    const LIMIT = 7;
    if (curSubSlug !== slug) {
      set({
        ...initialState,
        curSubSlug: slug,
        loading: true,
      });

      try {
        const { data } = await clientAxiosInstance.get(
          `/api/post/list/${slug}?page=${page}&limit=${LIMIT}`
        );
        set((state) => ({
          posts: page === 0 ? data.posts : [...state.posts, ...data.posts],
          page: state.page + 1,
          hasMore: data.posts.length === LIMIT,
          loading: false,
        }));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        set({ loading: false });
      }
    }

    if (loading || !hasMore) return;

    set({ loading: true });

    try {
      const { data } = await clientAxiosInstance.get(
        `/api/post/list/${slug}?page=${page}&limit=${LIMIT}`
      );

      set((state) => ({
        posts: page === 0 ? data.posts : [...state.posts, ...data.posts],
        page: state.page + 1,
        hasMore: data.posts.length === LIMIT,
        loading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      set({ loading: false });
    }
  },

  clearPosts: () => set(initialState),

  vote: async (identifier: string, slug: string, value: number) => {
    const originPosts = get().posts;
    const updatedPosts = originPosts.map((post) => {
      if (post.identifier === identifier) {
        const newUserVote = post.userVote === value ? 0 : value;

        const voteChange = newUserVote - (post.userVote || 0);
        const newVoteScore = post.voteScore + voteChange;

        return { ...post, userVote: newUserVote, voteScore: newVoteScore };
      }
      return post;
    });

    set({ posts: updatedPosts });

    try {
      const targetPost = updatedPosts.find(
        (post) => post.identifier === identifier
      );

      if (!targetPost) {
        await clientAxiosInstance.patch('/api/vote', {
          identifier,
          slug,
          value,
        });
        return;
      }

      const { data } = await clientAxiosInstance.patch('/api/vote', {
        identifier,
        slug,
        value: targetPost.userVote,
      });

      set((state) => ({
        posts: state.posts.map((p) => (p.identifier === identifier ? data : p)),
      }));
    } catch (error) {
      console.error('Vote failed, rolling back.', error);
      set({ posts: originPosts });
    }
  },
}));
