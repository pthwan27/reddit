import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User";

export const MeHandler: RequestHandler = async (req, res) => {
  try {
    // 쿠키에서 토큰 읽기, 없으면 Authorization 헤더에서 읽기 (하위 호환성)
    let token = req.cookies?.auth_token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    // JWT 토큰 검증
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as any;

    if (!decoded.userId) {
      res.status(401).json({ error: "Invalid token structure" });
      return;
    }

    // 사용자 정보 조회
    const user = await User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    // 비밀번호 제외하고 사용자 정보 반환
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      user: userWithoutPassword,
    });
    return;
  } catch (error) {
    console.error("Error getting user info:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Token expired" });
      return;
    }
    res.status(500).json({ error: "Failed to get user info" });
    return;
  }
};
