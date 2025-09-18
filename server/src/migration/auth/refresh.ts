import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User";

export const RefreshHandler: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      res.status(401).json({ error: "No refresh token provided" });
      return;
    }

    // 리프레시 토큰 검증
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "your-refresh-secret"
    ) as any;

    if (!decoded.userId || decoded.type !== "refresh") {
      res.status(401).json({ error: "Invalid refresh token" });
      return;
    }

    // 사용자 정보 조회
    const user = await User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    // 새로운 액세스 토큰 생성
    const newAccessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "15m" }
    );

    // 새로운 액세스 토큰을 쿠키로 설정
    res.cookie("auth_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15분
      path: "/",
    });

    res.status(200).json({
      message: "Token refreshed successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
    return;
  } catch (error) {
    console.error("Error during token refresh:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Invalid refresh token" });
      return;
    }
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Refresh token expired" });
      return;
    }
    res.status(500).json({ error: "Failed to refresh token" });
    return;
  }
};
