import { create } from 'zustand';

import { Post } from '../types';
import { PostStore } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

const initialState = {
  posts: [] as Post[],
  loading: false,
  page: 0,
  hasMore: true,
  selectedPost: null,
  curSubId: 0,
};

export const usePostStore = create<PostStore>((set, get) => ({
  ...initialState,

  setSelectedPost: (post: Post | null) => set({ selectedPost: post }),

  fetchPosts: async (id: number) => {
    const { loading, page, hasMore, curSubId } = get();
    const LIMIT = 7;

    if (curSubId !== id) {
      set({
        ...initialState,
        curSubId: id,
        loading: true,
      });

      try {
        const { data } = await clientAxiosInstance.get(
          `/api/post/list/${id}?page=${0}&limit=${LIMIT}`
        );
        set((state) => ({
          posts: page === 0 ? data.posts : [...state.posts, ...data.posts],
          page: 1,
          hasMore: data.posts.length === LIMIT,
          loading: false,
          curSubId: id,
        }));

        return;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        set({ loading: false });

        return;
      }
    }

    if (loading || !hasMore) return;

    set({ loading: true });

    try {
      const { data } = await clientAxiosInstance.get(
        `/api/post/list/${id}?page=${page}&limit=${LIMIT}`
      );

      set((state) => ({
        posts: [...state.posts, ...data.posts],
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
