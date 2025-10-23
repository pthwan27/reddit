import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const RegisterHandler: RequestHandler = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // 입력 값 검증
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ error: '이메일, 사용자 이름 및 비밀번호를 입력해주세요' });
    }

    // 이메일 또는 사용자 이름 중복 확인
    const existingEmail = await User.findOneBy({ email });
    const existingUsername = await User.findOneBy({ username });

    if (existingEmail) {
      return res.status(402).json({ error: '이미 존재하는 이메일입니다.' });
    }

    if (existingUsername) {
      return res
        .status(402)
        .json({ error: '이미 존재하는 사용자 이름입니다.' });
    }

    // 사용자 생성
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    await user.save();

    const profileSub = Sub.create({
      title: user.username,
      slug: user.username,
      description: `${user.username}의 프로필 페이지입니다.`,
      user: user,
      profileUser: user,
    });
    await profileSub.save();

    user.profileSub = profileSub;
    await user.save();

    // JWT 토큰 생성 (액세스 토큰 - 짧은 만료시간)
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '15m' } // 15분
    );

    // 리프레시 토큰 생성 (긴 만료시간)
    const refreshToken = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
      { expiresIn: '7d' } // 7일
    );

    // HttpOnly 쿠키로 토큰 설정
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

    // 비밀번호를 제외한 사용자 정보를 반환
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};
