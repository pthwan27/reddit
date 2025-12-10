import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Post } from '../../entities/Post';
import { Subscription } from '../../entities/Subscription';
import { User } from '../../entities/User';

export const ListHandler: RequestHandler = async (req, res) => {
  const user: User | undefined = res.locals.user;
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const [posts] = await Post.findAndCount({
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

      const subscriptions = await Subscription.find({
        where: { user: { id: user.id } },
        relations: ['sub', 'sub.subscribers'],
      });

      const subscriptionSubIds = subscriptions.map((s) => s.sub.id);

      posts.forEach((p: Post) => {
        if (subscriptionSubIds.includes(p.sub.id)) {
          p.sub.isSubscribed = true;
        }
      });
    }

    return res.status(200).json({ posts: instanceToPlain(posts) });
  } catch (error) {
    console.error('Error fetching post list:', error);
    return res.status(500).json({ error: 'Failed to Get post list' });
  }
};
