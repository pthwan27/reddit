import { Router } from "express";
import { RegisterHandler } from "../../migration/auth/register";
import { LoginHandler } from "../../migration/auth/login";
import { MeHandler } from "../../migration/auth/me";
import { LogoutHandler } from "../../migration/auth/logout";
import { RefreshHandler } from "../../migration/auth/refresh";

const router = Router();

// 회원가입
router.post("/register", RegisterHandler);

// 로그인
router.post("/login", LoginHandler);

// 사용자 정보 조회 (토큰 필요)
router.get("/me", MeHandler);

// 로그아웃
router.post("/logout", LogoutHandler);

// 토큰 새로고침
router.post("/refresh", RefreshHandler);

export default router;
