import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { AppDataSource } from '../../data-source';
import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const GetMyListHandler: RequestHandler = async (req, res) => {
  try {
    const user: User = res.locals.user;

    if (!user) {
      return res.status(401).json({ error: 'User not found in context' });
    }

    const subs = await AppDataSource.getRepository(Sub)
      .createQueryBuilder('sub')
      .innerJoin('sub.subscribers', 'subscription')
      .where('subscription.userId = :userId', { userId: user.id })
      .getMany();

    subs.forEach((sub) => {
      sub.isSubscribed = true;
      sub.isOwner = sub.userId === user.id;
    });

    return res.status(200).json({ subs: instanceToPlain(subs) });
  } catch (error) {
    console.error('Error getting my sub-list:', error);

    res.status(500).json({ error: 'Failed to get my sub-list' });
    return;
  }
};
