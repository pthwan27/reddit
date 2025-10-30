import { create } from 'zustand';

import { Post } from '../types';
import { PostStore } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

const initialState = {
  posts: [] as Post[],
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

  vote: async (identifier: string, slug: string, value: number) => {
    const originPosts = get().posts;
    const updatedPosts = originPosts.map((post) => {
      if (post.identifier === identifier) {
        const newUserVote = post.userVoted === value ? 0 : value;

        let newVoteScore = post.voteScore;

        if (newUserVote === 0) {
          newVoteScore -= post.userVoted;
        } else {
          newVoteScore += newUserVote - (post.userVoted || 0) + newUserVote;
        }

        return { ...post, userVote: newUserVote, voteScore: newVoteScore };
      }
      return post;
    });

    set({ posts: updatedPosts });

    try {
      const targetPost = updatedPosts.find(
        (post) => post.identifier === identifier
      );

      if (targetPost) {
        await clientAxiosInstance.post('/api/votes', {
          identifier,
          slug,
          value: targetPost.userVoted,
        });
      }
    } catch (error) {
      console.error('Vote failed, rolling back.', error);
      set({ posts: originPosts });
    }
  },
}));
