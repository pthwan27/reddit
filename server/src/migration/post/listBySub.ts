import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Post } from '../../entities/Post';
import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const ListBySubHandler: RequestHandler = async (req, res) => {
  const user: User | undefined = res.locals.user;
  const { id } = req.params;
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const sub = await Sub.findOneBy({ id: parseInt(id, 10) });

    if (!sub) {
      return res.status(404).json({ error: '커뮤니티를 찾을 수 없습니다.' });
    }

    const [posts] = await Post.findAndCount({
      where: { sub: { id: parseInt(id, 10) } },
      order: { createdAt: 'DESC' },
      relations: [
        'user',
        'sub',
        'votes',
        'votes.user',
        'comments',
        'comments.user',
      ],

      skip: page * limit,
      take: limit,
    });

    if (user) {
      posts.forEach((p: Post) => p.setUserVote(user));
    }

    return res.status(200).json({ posts: instanceToPlain(posts) });
  } catch (error) {
    console.error('Error fetching post list:', error);
    return res.status(500).json({ error: 'Failed to Get post list' });
  }
};
