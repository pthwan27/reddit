import { RequestHandler } from "express";

export const LogoutHandler: RequestHandler = async (req, res) => {
  try {
    // HttpOnly 쿠키 제거
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // 리프레시 토큰 쿠키도 제거
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({
      message: "Logout successful",
    });
    return;
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Failed to logout" });
    return;
  }
};
