import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Post } from '../../entities/Post';
import { User } from '../../entities/User';
import { Vote } from '../../entities/Vote';

export const VoteHandler: RequestHandler = async (req, res) => {
  const { identifier, slug, value } = req.body;
  const user: User = res.locals.user;
  const post = await Post.findOne({
    where: { identifier, slug },
    relations: ['votes'],
  });

  if (!user) {
    return res.status(401).json({ error: 'User not found in context' });
  }

  if (!post)
    return res.status(404).json({ error: '게시물을 찾을 수 없습니다' });

  if (!identifier || !slug || value === undefined || value === null) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingVote = await Vote.findOne({
      where: { user: { id: user.id }, post: { id: post.id } },
    });

    if (value === 0) {
      if (existingVote) {
        await Vote.remove(existingVote);
      }
    } else if (existingVote) {
      existingVote.value = value;
      await existingVote.save();
    } else {
      const vote = Vote.create({ value, user, post });
      await vote.save();
    }

    const updatedPost = await Post.findOne({
      where: { identifier, slug },
      relations: ['votes', 'user', 'comments', 'votes.user'],
    });

    if (updatedPost && user) {
      updatedPost.setUserVote(user);
    }

    return res.json(instanceToPlain(updatedPost));
  } catch (error) {
    if (error?.code === '23505') {
      await Vote.createQueryBuilder()
        .update(Vote)
        .set({ value })
        .where('userId = :userId AND postId = :postId', {
          userId: user.id,
          postId: post.id,
        })
        .execute();
    }
    console.error('Error voting:', error);
    return res.status(500).json({ error: 'Failed to vote' });
  }
};
