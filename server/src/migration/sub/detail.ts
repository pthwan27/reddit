import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { Sub } from '../../entities/Sub';

export const GetSubDetailHandler: RequestHandler = async (req, res) => {
  try {
    const slug = req.params.slug;

    const sub = await Sub.findOneBy({ slug });

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
