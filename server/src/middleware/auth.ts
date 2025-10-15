import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../entities/User';

export const AuthMiddleware: RequestHandler = async (req, res, next) => {
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

    // 사용자 정보 조회
    const user = await User.findOneBy({ id: decoded.userId });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    res.locals.user = user;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthenticated' });
  }
};
