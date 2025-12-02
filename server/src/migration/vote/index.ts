import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Comment } from '../../entities/Comment';
import { Post } from '../../entities/Post';
import { User } from '../../entities/User';
import { Vote } from '../../entities/Vote';

export const VoteHandler: RequestHandler = async (req, res) => {
  const { id, value, type } = req.body;
  const user: User = res.locals.user;

  const selectedEntity =
    type === 'post'
      ? await Post.findOne({
          where: { id },
          relations: ['votes'],
        })
      : await Comment.findOne({
          where: { id },
          relations: ['votes'],
        });

  if (!user) {
    return res.status(401).json({ error: 'User not found in context' });
  }

  if (!selectedEntity)
    return res.status(404).json({ error: '투표 대상을 찾을 수 없습니다' });

  if (!id || !type || value === undefined || value === null) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingVote = await Vote.findOne({
      where:
        type === 'post'
          ? { user: { id: user.id }, post: { id } }
          : { user: { id: user.id }, comment: { id } },
    });

    if (value === 0) {
      if (existingVote) {
        await Vote.remove(existingVote);
      }
    } else if (existingVote) {
      existingVote.value = value;
      await existingVote.save();
    } else {
      const vote = Vote.create({ value, user, [type]: selectedEntity });
      await vote.save();
    }

    if (type === 'post') {
      const updatedPost = await Post.findOne({
        where: { id },
        relations: ['votes', 'user', 'comments', 'votes.user', 'sub'],
      });

      if (updatedPost && user) {
        updatedPost.setUserVote(user);
      }

      return res.json(instanceToPlain(updatedPost));
    } else {
      const updatedComment = await Comment.findOne({
        where: { id },
        relations: ['votes', 'user', 'votes.user'],
      });

      if (updatedComment && user) {
        updatedComment.setUserVote(user);
      }
      return res.json(instanceToPlain(updatedComment));
    }
  } catch (error) {
    if (error?.code === '23505') {
      const updateQuery =
        type === 'post'
          ? Vote.createQueryBuilder()
              .update(Vote)
              .set({ value })
              .where('userId = :userId AND postId = :postId', {
                userId: user.id,
                postId: id,
              })
          : Vote.createQueryBuilder()
              .update(Vote)
              .set({ value })
              .where('userId = :userId AND commentId = :commentId', {
                userId: user.id,
                commentId: id,
              });

      await updateQuery.execute();
    }
    console.error('Error voting:', error);
    return res.status(500).json({ error: 'Failed to vote' });
  }
};
