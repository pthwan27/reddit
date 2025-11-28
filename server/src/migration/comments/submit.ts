import { RequestHandler } from 'express';

import { Comment } from '../../entities/Comment';
import { User } from '../../entities/User';

export const SubmitHandler: RequestHandler = async (req, res) => {
  const { comment, postId, postSlug } = req.body;

  const user: User = res.locals.user;

  console.log('Submitting comment:', comment, postId, postSlug);

  if (!user) {
    return res.status(401).json({ error: 'User not found in context' });
  }
  if (!postId || !postSlug || !comment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newComment = new Comment();

    newComment.body = comment;
    newComment.user = user;
    newComment.postId = parseInt(postId, 10);

    await newComment.save();
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
