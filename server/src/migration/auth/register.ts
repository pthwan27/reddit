import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';

import { User } from '../../entities/User';

export const RegisterHandler: RequestHandler = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // 입력 값 검증
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ error: 'Email, username, and password are required' });
    }

    // 이메일 또는 사용자 이름 중복 확인
    const existingUser = await User.findOne({
      where: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'Email or username already exists' });
    }

    // 사용자 생성
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = await bcrypt.hash(password, 10); // 비밀번호 해싱

    await user.save();

    // 비밀번호를 제외한 사용자 정보를 반환
    const { password: _, ...userWithoutPassword } = user;

    // 201 Created 상태 코드와 함께 사용자 정보 반환
    return res.status(201).json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};
