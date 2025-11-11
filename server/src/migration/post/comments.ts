import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Comment } from '../../entities/Comment';
import { Post } from '../../entities/Post';
import { User } from '../../entities/User';

export const GetPostDetailHandler: RequestHandler = async (req, res) => {
  try {
    const user: User | undefined = res.locals.user;
    const { postId } = req.params;

    const post = await Post.findOne({
      where: { identifier: postId },
      relations: ['user', 'sub', 'votes', 'votes.user', 'comments'],
    });

    if (user) {
      post.setUserVote(user);
    }

    const comments = await Comment.find({
      where: { postId: post.id },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      // take, skip 추가 -> 페이징
    });

    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    return res.status(200).json({
      post: instanceToPlain(post),
      comments: instanceToPlain(comments),
    });
  } catch (error) {
    console.error('Error getting post detail:', error);

    res.status(500).json({ error: 'Failed to get post detail' });
    return;
  }
};
