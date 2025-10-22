import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';

import { Sub } from '../../entities/Sub';
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
    user.password = await bcrypt.hash(password, 10);

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
