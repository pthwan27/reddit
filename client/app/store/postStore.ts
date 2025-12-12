import { create } from 'zustand';

import { Post } from '../types';
import { PostState } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

const initialState = {
  posts: [] as Post[],
  loading: false,
  page: 0,
  hasMore: true,
  curSubId: 0,
  selectedPost: null,
};

export const usePostStore = create<PostState>((set, get) => ({
  ...initialState,

  setSelectedPost: (post: Post | null) => set({ selectedPost: post }),

  fetchHomePosts: async (isInitial?: boolean) => {
    const { loading, page, hasMore } = get();
    const LIMIT = 10;

    if (isInitial) {
      set({ ...initialState });
    }

    if (loading || !hasMore) return;
    set({ loading: true });

    try {
      const { data } = await clientAxiosInstance(
        `/api/home/posts?page=${page}&limit=${LIMIT}`
      );

      set((state) => ({
        posts: isInitial ? data.posts : [...state.posts, ...data.posts],
        page: isInitial ? 1 : state.page + 1,
        hasMore: data.posts.length === LIMIT,
      }));
    } catch (error) {
      console.error('Failed to fetch home posts:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchSubPosts: async (id: number) => {
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

  vote: async (id: number, value: number, type: string) => {
    const { posts: originPosts, selectedPost } = get();

    const updatedPosts = originPosts.map((post) => {
      if (post.id === id) {
        const newUserVote = post.userVote === value ? 0 : value;

        const voteChange = newUserVote - (post.userVote || 0);
        const newVoteScore = post.voteScore + voteChange;

        return { ...post, userVote: newUserVote, voteScore: newVoteScore };
      }
      return post;
    });

    let updatedSelectedPost = selectedPost;
    if (selectedPost && selectedPost.id === id) {
      const newUserVote = selectedPost.userVote === value ? 0 : value;
      const voteChange = newUserVote - (selectedPost.userVote || 0);
      const newVoteScore = selectedPost.voteScore + voteChange;

      updatedSelectedPost = {
        ...selectedPost,
        userVote: newUserVote,
        voteScore: newVoteScore,
      };
    }
    set({ posts: updatedPosts, selectedPost: updatedSelectedPost });

    try {
      const targetPost = updatedPosts.find((post) => post.id === id);

      if (!targetPost) {
        await clientAxiosInstance.patch('/api/vote', {
          id,
          value,
          type,
        });
        return;
      }

      const { data } = await clientAxiosInstance.patch('/api/vote', {
        id,
        value: targetPost.userVote,
        type,
      });

      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? data : p)),
        selectedPost: state.selectedPost?.id === id ? data : state.selectedPost,
      }));
    } catch (error) {
      console.error('Vote failed, rolling back.', error);
      set({
        posts: originPosts,
        selectedPost: selectedPost,
      });
    }
  },

  updatePostSubscribeStatus: (subId: number, isSubscribed: boolean) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.sub.id === subId) {
          return { ...post, sub: { ...post.sub, isSubscribed } };
        }
        return post;
      }),
    }));
  },

  reset: () => set(initialState),
}));
