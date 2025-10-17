import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const GetSubDetailHandler: RequestHandler = async (req, res) => {
  try {
    const user: User = res.locals.user;

    if (!user) {
      return res.status(401).json({ error: 'User not found in context' });
    }

    const subId: number = parseInt(req.params.id, 10);

    const sub = await Sub.findOne({ where: { id: subId } });

    if (!sub) {
      return res.status(404).json({ error: '커뮤니티를 찾을 수 없습니다.' });
    }

    return res.status(200).json(instanceToPlain(sub));
  } catch (error) {
    console.error('Error getting sub detail:', error);

    res.status(500).json({ error: 'Failed to get sub detail' });
    return;
  }
};
