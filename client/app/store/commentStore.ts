import { create } from 'zustand';

import { Comment } from '../types';
import { CommentState, SortOption } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

const initialState = {
  comments: [] as Comment[],
  loading: false,
  submitting: false,
  page: 0,
  hasMore: true,
  curPostId: 0,
};

export const useCommentStore = create<CommentState>((set, get) => ({
  ...initialState,

  submitComment: async (
    id: number,
    content: string,
    type: 'post' | 'comment'
  ) => {
    if (!content.trim()) {
      throw new Error('Comment content cannot be empty');
    }

    set({ submitting: true });

    try {
      const formData = new FormData();

      formData.append('id', id.toString());
      formData.append('comment', content);
      formData.append('type', type);

      const { data } = await clientAxiosInstance.post(
        `/api/comments/submit`,
        formData
      );

      if (type === 'post') {
        set((state) => ({
          comments: [{ ...data, childComments: [] }, ...state.comments],
          submitting: false,
        }));
      } else {
        const addReplyToTree = (
          comments: Comment[],
          parentId: number,
          newReply: Comment
        ) => {
          return comments.map((comment: Comment): Comment => {
            if (comment.id === parentId) {
              return {
                ...comment,
                childComments: [
                  ...(comment.childComments || []),
                  { ...newReply, childComments: [] },
                ],
                commentCount: (comment.commentCount || 0) + 1,
              };
            } else if (
              comment.childComments &&
              comment.childComments.length > 0
            ) {
              return {
                ...comment,
                childComments: addReplyToTree(
                  comment.childComments,
                  parentId,
                  newReply
                ),
              };
            }
            return comment;
          });
        };

        set((state) => ({
          comments: addReplyToTree(state.comments, id, data),
          submitting: false,
        }));
      }
    } catch (error) {
      set({ submitting: false });
      throw error;
    }
  },

  fetchComments: async (
    id: number,
    isInitial?: boolean,
    option?: SortOption
  ) => {
    const { page, curPostId } = get();
    const LIMIT = 10;

    if (get().loading) return;

    const isPostChanged = curPostId !== id;

    const currentPage = isPostChanged || isInitial ? 0 : page;
    const currentSortOption = option || '최신순';

    set({ loading: true });

    try {
      const { data } = await clientAxiosInstance.get(
        `/api/comments/getOnPost/${id}?page=${currentPage}&limit=${LIMIT}&sortOption=${currentSortOption}`
      );

      set((state) => ({
        comments: isPostChanged
          ? data.comments
          : [...state.comments, ...data.comments],
        page: currentPage + 1,
        hasMore: data.comments.length === LIMIT,
        loading: false,
        curPostId: id,
      }));
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      set({ loading: false });
    }
  },

  clearComments: () => set(initialState),

  vote: async (id: number, value: number, type: string) => {
    const originComments = get().comments;

    const updateVoteInTree = (
      comments: Comment[],
      targetId: number,
      updateFn: (comment: Comment) => Comment
    ): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === targetId) {
          return updateFn(comment);
        }

        if (comment.childComments && comment.childComments.length > 0) {
          return {
            ...comment,
            childComments: updateVoteInTree(
              comment.childComments,
              targetId,
              updateFn
            ),
          };
        }

        return comment;
      });
    };

    const optimisticallyUpdatedComments = updateVoteInTree(
      originComments,
      id,
      (comment) => {
        const originalUserVote = comment.userVote || 0;
        const newUserVote = originalUserVote === value ? 0 : value;
        const voteChange = newUserVote - originalUserVote;
        return {
          ...comment,
          userVote: newUserVote,
          voteScore: (comment.voteScore || 0) + voteChange,
        };
      }
    );

    set({ comments: optimisticallyUpdatedComments });

    try {
      const targetComment = optimisticallyUpdatedComments
        .flat()
        .find((comment) => comment.id === id);

      const finalUserVote =
        updateVoteInTree(optimisticallyUpdatedComments, id, (c) => c).find(
          (c) => c.id === id
        )?.userVote || 0;

      if (!targetComment) {
        await clientAxiosInstance.patch('/api/vote', {
          id,
          value: finalUserVote,
          type,
        });
        return;
      }

      await clientAxiosInstance.patch('/api/vote', {
        id,
        value: targetComment.userVote,
        type,
      });
    } catch (error) {
      console.error('Vote failed, rolling back.', error);
      set({ comments: originComments });
    }
  },
}));
