import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { AppDataSource } from '../../data-source';
import { Sub } from '../../entities/Sub';

export const GetPopularSubsHandler: RequestHandler = async (req, res) => {
  try {
    const subs = await AppDataSource.getRepository(Sub)
      .createQueryBuilder('sub')
      .leftJoinAndSelect('sub.subscribers', 'subscribers')
      .getMany();

    const sortedSubs = subs.sort(
      (a, b) => b.subscriberCount - a.subscriberCount
    );

    return res.status(200).json({ subs: instanceToPlain(sortedSubs) });
  } catch (error) {
    console.error('Error getting my sub-list:', error);

    res.status(500).json({ error: 'Failed to get my sub-list' });
    return;
  }
};
