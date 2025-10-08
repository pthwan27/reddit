import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../entities/User';

export const RegisterHandler: RequestHandler = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // 입력 검증
    if (!email || !username || !password) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ error: 'Password must be at least 6 characters long' });
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    // 이메일 중복 검사
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      res.status(409).json({ error: 'Email already exists' });
      return;
    }

    // 사용자명 중복 검사
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      res.status(409).json({ error: 'Username already exists' });
      return;
    }

    // 새 사용자 생성
    const user = new User();
    user.email = email.toLowerCase().trim();
    user.username = username.trim();
    user.password = password;

    await user.save();

    // JWT 토큰 생성 (회원가입 후 자동 로그인을 위해)
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '15m' }
    );

    // 리프레시 토큰 생성
    const refreshToken = jwt.sign(
      {
        userId: user.id,
        type: 'refresh',
      },
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
      { expiresIn: '7d' }
    );

    // HttpOnly 쿠키로 액세스 토큰 설정
    res.cookie('auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15분
      path: '/',
    });

    // 리프레시 토큰도 HttpOnly 쿠키로 설정
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      path: '/',
    });

    // 비밀번호 제외하고 사용자 정보 반환
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'User created successfully',
      user: userWithoutPassword,
    });

    return;
  } catch (error) {
    console.error('Error saving user:', error);

    res.status(500).json({ error: 'Failed to create user' });
    return;
  }
};
