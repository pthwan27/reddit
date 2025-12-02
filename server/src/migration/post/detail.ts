import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Post } from '../../entities/Post';
import { User } from '../../entities/User';

export const GetPostDetailHandler: RequestHandler = async (req, res) => {
  try {
    const { identifier } = req.params;

    const user: User | undefined = res.locals.user;

    const post = await Post.findOne({
      where: { identifier },
      relations: ['user', 'sub', 'votes', 'votes.user', 'comments'],
    });

    if (user) {
      post.setUserVote(user);
    }

    if (!post) {
      return res.status(404).json({ error: '커뮤니티를 찾을 수 없습니다.' });
    }

    return res.status(200).json(instanceToPlain(post));
  } catch (error) {
    console.error('Error getting post detail:', error);

    res.status(500).json({ error: 'Failed to get post detail' });
    return;
  }
};
