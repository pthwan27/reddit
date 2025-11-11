import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const GetMyListHandler: RequestHandler = async (req, res) => {
  try {
    const user: User = res.locals.user;

    if (!user) {
      return res.status(401).json({ error: 'User not found in context' });
    }

    const subs = await Sub.find({
      where: { user: { id: user.id } },
      order: {
        createdAt: 'DESC',
        updatedAt: 'DESC',
      },
    });

    return res.status(200).json({ subs: instanceToPlain(subs) });
  } catch (error) {
    console.error('Error getting my sub-list:', error);

    res.status(500).json({ error: 'Failed to get my sub-list' });
    return;
  }
};
