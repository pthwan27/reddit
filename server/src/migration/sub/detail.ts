import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Sub } from '../../entities/Sub';
import { Subscription } from '../../entities/Subscription';
import { User } from '../../entities/User';

export const GetSubDetailHandler: RequestHandler = async (req, res) => {
  try {
    const user: User | undefined = res.locals.user;

    const slug = req.params.slug;

    const sub = await Sub.findOne({
      where: { slug },
      relations: ['user'],
    });

    if (!sub) {
      return res.status(404).json({ error: '커뮤니티를 찾을 수 없습니다.' });
    }
    sub.isSubscribed = false;
    sub.isOwner = false;

    if (user) {
      const subscription = await Subscription.findOne({
        where: { user: { id: user.id }, sub: { id: sub.id } },
      });

      sub.isSubscribed = !!subscription;
      sub.isOwner = user.id === sub.userId;
    }

    return res.status(200).json(instanceToPlain(sub));
  } catch (error) {
    console.error('Error getting sub detail:', error);

    res.status(500).json({ error: 'Failed to get sub detail' });
    return;
  }
};
