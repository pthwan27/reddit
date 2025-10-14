import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { Sub } from '../../entities/Sub';

export const GetMyListHandler: RequestHandler = async (req, res) => {
  try {
    let token = req.cookies?.auth_token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    // JWT 토큰 검증
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as any;

    if (!decoded.userId) {
      res.status(401).json({ error: 'Invalid token structure' });
      return;
    }

    const subs = await Sub.find({ where: { user: { id: decoded.userId } } });

    return res.status(200).json({ subs });
  } catch (error) {
    console.error('Error getting my sub-list:', error);

    res.status(500).json({ error: 'Failed to get my sub-list' });
    return;
  }
};
