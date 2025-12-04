import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Comment } from '../../entities/Comment';
import { Post } from '../../entities/Post';
import { User } from '../../entities/User';

export const SubmitHandler: RequestHandler = async (req, res) => {
  const { id, comment: body, type } = req.body;

  const user: User = res.locals.user;

  if (!user) {
    return res.status(401).json({ error: 'User not found in context' });
  }
  if (!id || !body || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  let comment: Comment;
  try {
    if (type === 'post') {
      const post = await Post.findOne({ where: { id: parseInt(id, 10) } });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      comment = Comment.create({
        body,
        user,
        post,
        postId: post.id,
        parentComment: null,
      });
    } else {
      const parentComment = await Comment.findOne({
        where: { id: parseInt(id, 10) },
        relations: ['post'],
      });

      if (!parentComment) {
        return res.status(404).json({ error: 'Parent comment not found' });
      }

      comment = Comment.create({
        body,
        user,
        post: parentComment.post,
        postId: parentComment.post.id,
        parentComment,
      });
    }

    await comment.save();

    const savedComment = await Comment.findOne({
      where: { id: comment.id },
      relations: ['user', 'votes', 'votes.user'],
    });

    if (user && savedComment) {
      savedComment.setUserVote(user);
    }

    return res.status(201).json(instanceToPlain(savedComment));
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
