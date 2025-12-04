import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Comment } from '../../entities/Comment';
import { Post } from '../../entities/Post';
import { User } from '../../entities/User';

export const GetCommentsOnPostHandler: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user: User | undefined = res.locals.user;

    const post = await Post.findOneBy({
      id: parseInt(id, 10),
    });

    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    if (user) {
      post.setUserVote(user);
    }

    const allComments = await Comment.find({
      where: { postId: parseInt(id, 10) },
      relations: ['user', 'votes', 'votes.user'],
      order: { createdAt: 'DESC' },
    });

    if (user) {
      allComments.forEach((comment) => {
        comment.setUserVote(user);
      });
    }

    const buildCommentTree = (comments: Comment[]) => {
      const commentMap = new Map<number, any>();

      const rootComments = [];

      comments.forEach((comment: Comment) => {
        const instanceToPlainComment = instanceToPlain(comment);

        commentMap.set(comment.id, {
          ...instanceToPlainComment,
          childComments: [],
        });
      });

      comments.forEach((comment: Comment) => {
        const currentComment = commentMap.get(comment.id);

        if (comment.parentCommentId) {
          const parentComment = commentMap.get(comment.parentCommentId);

          if (parentComment && currentComment) {
            parentComment.childComments.push(currentComment);
          }
        } else {
          if (currentComment) {
            rootComments.push(currentComment);
          }
        }
      });

      return rootComments;
    };
    const commentTree = buildCommentTree(allComments);

    return res.status(200).json({
      comments: commentTree,
    });
  } catch (error) {
    console.error('Error getting comment list:', error);

    res.status(500).json({ error: 'Failed to get comment list' });
    return;
  }
};
