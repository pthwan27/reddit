import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Comment } from '../../entities/Comment';
import { Post } from '../../entities/Post';
import { User } from '../../entities/User';

export const GetCommentsOnPostHandler: RequestHandler = async (req, res) => {
  try {
    const user: User | undefined = res.locals.user;

    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    const { postId, postSlug } = req.params;

    const post = await Post.findOne({
      where: { identifier: postId, slug: postSlug },
    });

    if (user) {
      post.setUserVote(user);
    }
    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    const [comments] = await Comment.findAndCount({
      where: { postId: post.id },
      relations: ['user'],
      order: { createdAt: 'DESC' },

      skip: page * limit,
      take: limit,
    });

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
