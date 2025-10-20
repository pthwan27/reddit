import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../entities/User';

export const RefreshHandler: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' });
    }

    // 리프레시 토큰 검증
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret'
    ) as { userId: number };

    // 사용자 정보 조회
    const user = await User.findOneBy({ id: decoded.userId });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // 새로운 액세스 토큰 생성
    const newAccessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '15m' }
    );

    // 새로운 액세스 토큰을 쿠키로 설정
    res.cookie('auth_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15분
      path: '/',
    });

    // 비밀번호를 제외한 사용자 정보를 반환
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error during token refresh:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Refresh token expired' });
    }
    return res.status(500).json({ error: 'Failed to refresh token' });
  }
};
