import { Router } from 'express';

import { AuthMiddleware } from '../../middleware/auth';
import { LoginHandler } from '../../migration/auth/login';
import { LogoutHandler } from '../../migration/auth/logout';
import { MeHandler } from '../../migration/auth/me';
import { RefreshHandler } from '../../migration/auth/refresh';
import { RegisterHandler } from '../../migration/auth/register';

const AuthRouter = Router();

// 회원가입
AuthRouter.post('/register', RegisterHandler);

// 로그인
AuthRouter.post('/login', LoginHandler);

// 사용자 정보 조회 (토큰 필요)
AuthRouter.get('/me', AuthMiddleware, MeHandler);

// 로그아웃
AuthRouter.post('/logout', LogoutHandler);

// 토큰 새로고침
AuthRouter.post('/refresh', RefreshHandler);

export default AuthRouter;
