import { RequestHandler } from 'express';

import { Post } from '../../entities/Post';
import { Sub } from '../../entities/Sub';

export const ListBySubHandler: RequestHandler = async (req, res) => {
  const slug = req.params.slug;
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const sub = await Sub.findOneBy({ slug });

    if (!sub) {
      return res.status(404).json({ error: '커뮤니티를 찾을 수 없습니다.' });
    }

    const [posts] = await Post.findAndCount({
      where: { sub: { slug } },
      order: { createdAt: 'DESC' },
      relations: ['user', 'votes', 'comments'],

      skip: page * limit,
      take: limit,
    });
    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching post list:', error);
    return res.status(500).json({ error: 'Failed to Get post list' });
  }
};
