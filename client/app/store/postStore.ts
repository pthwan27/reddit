import { create } from 'zustand';

import { Post } from '../types';
import { PostState, SortOption } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

const initialState = {
  posts: [] as Post[],
  highlightPosts: [] as Post[],
  loading: false,
  page: 0,
  hasMore: true,
  curSubId: 0,
  selectedPost: null,
};

export const usePostStore = create<PostState>((set, get) => ({
  ...initialState,

  setSelectedPost: (post: Post | null) => set({ selectedPost: post }),

  fetchHomePosts: async (isInitial?: boolean, option?: SortOption) => {
    if (get().loading) return;

    const { page } = get();
    const LIMIT = 10;

    const currentPage = isInitial ? 0 : page;
    const currentSortOption = option || '최신순';

    set({ loading: true });

    try {
      const { data } = await clientAxiosInstance.get(
        `/api/home/posts?page=${currentPage}&limit=${LIMIT}&sortOption=${currentSortOption}`
      );

      set((state) => ({
        posts: isInitial ? data.posts : [...state.posts, ...data.posts],
        page: currentPage + 1,
        hasMore: data.posts.length === LIMIT,
        loading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch home posts:', error);
      set({ loading: false });
    }
  },

  fetchSubPosts: async (
    id: number,
    isInitial?: boolean,
    option?: SortOption
  ) => {
    if (get().loading) return;

    const { page, curSubId } = get();
    const LIMIT = 7;

    const isSubChanged = curSubId !== id;

    const currentPage = isSubChanged || isInitial ? 0 : page;
    const currentSortOption = option || '최신순';

    set({ loading: true });

    try {
      const { data } = await clientAxiosInstance.get(
        `/api/post/list/${id}?page=${currentPage}&limit=${LIMIT}&sortOption=${currentSortOption}`
      );

      set((state) => ({
        posts:
          isSubChanged || isInitial
            ? data.posts
            : [...state.posts, ...data.posts],
        page: currentPage + 1,
        hasMore: data.posts.length === LIMIT,
        curSubId: id,
        loading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      set({ loading: false });
    }
  },

  fetchHighlightPosts: async (id?: number) => {
    set({ loading: true });
    try {
      const { data } = await clientAxiosInstance.get(
        `/api/highlight/post/${id || ''}`
      );

      set({ highlightPosts: data.posts, loading: false });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      set({ loading: false });
    }
  },
  clearPosts: () =>
    set({
      posts: [],
      loading: false,
      page: 0,
      hasMore: true,
      curSubId: 0,
    }),

  clearHighlightPosts: () =>
    set({
      highlightPosts: [],
    }),

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

  updatePostCommentCount: (postId: number, isIncrease: boolean) => {
    set((state) => ({
      selectedPost:
        state.selectedPost && state.selectedPost.id === postId
          ? {
              ...state.selectedPost,
              commentCount: isIncrease
                ? state.selectedPost.commentCount + 1
                : state.selectedPost.commentCount - 1,
            }
          : state.selectedPost,
    }));
  },

  reset: () => set(initialState),
}));
