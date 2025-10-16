import { RequestHandler } from 'express';

import { User } from '../../entities/User';

export const MeHandler: RequestHandler = async (req, res) => {
  try {
    const user: User = res.locals.user;

    if (!user) {
      return res.status(401).json({ error: 'User not found in context' });
    }

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error in MeHandler:', error);
    return res.status(500).json({ error: 'Failed to get user info' });
  }
};
