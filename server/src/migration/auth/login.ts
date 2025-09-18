import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User";

export const LoginHandler: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 입력 검증
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // 이메일로 사용자 찾기
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(408).json({ error: "Invalid credentials" });
      return;
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(408).json({ error: "Invalid credentials" });
      return;
    }

    // JWT 토큰 생성 (액세스 토큰 - 짧은 만료시간)
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "15m" } // 15분
    );

    // 리프레시 토큰 생성 (긴 만료시간)
    const refreshToken = jwt.sign(
      {
        userId: user.id,
        type: "refresh",
      },
      process.env.JWT_REFRESH_SECRET || "your-refresh-secret",
      { expiresIn: "7d" } // 7일
    );

    // HttpOnly 쿠키로 토큰 설정
    res.cookie("auth_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15분
      path: "/",
    });

    // 리프레시 토큰도 HttpOnly 쿠키로 설정
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",

      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
    return;
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to login" });
    return;
  }
};
