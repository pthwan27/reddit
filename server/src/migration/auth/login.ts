import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../entities/User';

export const LoginHandler: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: '이메일과 비밀번호를 입력해주세요' });
    }

    const user = await User.findOneBy({ email });

    if (!user) {
      return res
        .status(402)
        .json({ error: '이메일 또는 비밀번호가 유효하지 않습니다..' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(402)
        .json({ error: '이메일 또는 비밀번호가 유효하지 않습니다.' });
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '15m' } // 15분.
    );

    const refreshToken = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
      { expiresIn: '7d' } // 7일
    );

    res.cookie('auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15분
      path: '/',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      path: '/',
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Failed to login' });
  }
};
