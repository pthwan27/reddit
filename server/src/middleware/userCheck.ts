import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../entities/User';

export const UserMiddleware: RequestHandler = async (req, res, next) => {
  try {
    let token = req.cookies?.auth_token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as any;

    const user = await User.findOneBy({ id: decoded.userId });

    if (!user) {
      return next(); // 유저가 없어도 그냥 다음으로 넘어감
    }

    res.locals.user = user;

    return next();
  } catch (error) {
    // 토큰이 유효하지 않아도 오류를 반환하지 않고 그냥 다음으로 넘어감
    console.error('Optional auth error:', error);
    return next();
  }
};
