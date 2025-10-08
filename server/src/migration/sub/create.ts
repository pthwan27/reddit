import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const CreateHandler: RequestHandler = async (req, res) => {
  const { title, description, banner, icon } = req.body;

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
    const user = await User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    // 입력 검증
    if (!title || !description || !banner || !icon) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const sub = new Sub();
    sub.title = title;
    sub.description = description;
    sub.bannerUrn = banner;
    sub.iconUrn = icon;
    sub.user = user;

    await sub.save();

    res.status(200).json({
      message: 'Sub created successfully',
    });

    return;
  } catch (error) {
    console.error('Error saving sub:', error);

    res.status(500).json({ error: 'Failed to create sub' });
    return;
  }
};
