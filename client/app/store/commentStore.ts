import { create } from 'zustand';

import { Comment } from '../types';
import { CommentStore } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

const initialState = {
  comments: [] as Comment[],
  loading: false,
  page: 0,
  hasMore: true,
  curPostId: 0,
};

export const useCommentStore = create<CommentStore>((set, get) => ({
  ...initialState,

  fetchComments: async (id: number) => {
    const { loading, page, hasMore, curPostId } = get();
    const LIMIT = 10;

    if (curPostId !== id) {
      set({
        ...initialState,
        curPostId: id,
        loading: true,
      });

      try {
        const { data } = await clientAxiosInstance.get(
          `/api/comments/getOnPost/${id}?page=${page}&limit=${LIMIT}`
        );
        set((state) => ({
          comments:
            page === 0 ? data.comments : [...state.comments, ...data.comments],
          page: 1,
          hasMore: data.comments.length === LIMIT,
          loading: false,
          curPostId: id,
        }));

        return;
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        set({ loading: false });

        return;
      }
    }

    if (loading || !hasMore) return;

    set({ loading: true });

    try {
      const { data } = await clientAxiosInstance.get(
        `/api/comments/getOnPost/${id}?page=${page}&limit=${LIMIT}`
      );

      set((state) => ({
        comments: [...state.comments, ...data.comments],
        page: state.page + 1,
        hasMore: data.comments.length === LIMIT,
        loading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      set({ loading: false });
    }
  },

  clearComments: () => set(initialState),

  vote: async (id: number, value: number, type: string) => {
    const originComments = get().comments;
    const updatedComments = originComments.map((comment) => {
      if (comment.id === id) {
        const newUserVote = comment.userVote === value ? 0 : value;

        const voteChange = newUserVote - (comment.userVote || 0);
        const newVoteScore = comment.voteScore + voteChange;

        return { ...comment, userVote: newUserVote, voteScore: newVoteScore };
      }
      return comment;
    });

    set({ comments: updatedComments });

    try {
      const targetComment = updatedComments.find(
        (comment) => comment.id === id
      );

      if (!targetComment) {
        await clientAxiosInstance.patch('/api/vote', {
          id,
          value,
          type,
        });
        return;
      }

      const { data } = await clientAxiosInstance.patch('/api/vote', {
        id,
        value: targetComment.userVote,
        type,
      });

      set((state) => ({
        comments: state.comments.map((c) => (c.id === id ? data : c)),
      }));
    } catch (error) {
      console.error('Vote failed, rolling back.', error);
      set({ comments: originComments });
    }
  },
}));
