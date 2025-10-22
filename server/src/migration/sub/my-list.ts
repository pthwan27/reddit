import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';
import { IsNull } from 'typeorm/find-options/operator/IsNull';

import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const GetMyListHandler: RequestHandler = async (req, res) => {
  try {
    const user: User = res.locals.user;
    const { subsOnly } = req.query;

    if (!user) {
      return res.status(401).json({ error: 'User not found in context' });
    }

    const whereConditions: any = { user: { id: user.id } };

    if (subsOnly === 'true') {
      whereConditions.profileUser = IsNull();
    }

    const subs = await Sub.find({
      where: whereConditions,
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
