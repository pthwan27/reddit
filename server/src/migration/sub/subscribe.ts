import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Sub } from '../../entities/Sub';
import { Subscription } from '../../entities/Subscription';
import { User } from '../../entities/User';

export const SubscribeHandler: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;

    const user: User | undefined = res.locals.user;

    if (!user) {
      return res.status(401).json({ error: 'User not found in context' });
    }

    if (!id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const sub = await Sub.findOneBy({ id });

    if (!sub) {
      return res.status(404).json({ error: '커뮤니티를 찾을 수 없습니다.' });
    }

    const subscription = await Subscription.findOne({
      where: { user: { id: user.id }, sub: { id: sub.id } },
    });

    if (subscription) {
      await subscription.remove();
      sub.isSubscribed = false;
      sub.isOwner = user.id === sub.userId;

      return res.status(200).json(instanceToPlain(sub));
    } else {
      const newSubscription = new Subscription();
      newSubscription.user = user;
      newSubscription.sub = sub;
      await newSubscription.save();

      sub.isSubscribed = true;
      sub.isOwner = user.id === sub.userId;
      return res.status(200).json(instanceToPlain(sub));
    }
  } catch (error) {
    console.error('Error patch sub subscribe:', error);

    res.status(500).json({ error: 'Failed to patch sub subscribe' });
    return;
  }
};
