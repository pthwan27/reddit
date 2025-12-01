import { Router } from 'express';
import multer from 'multer';

import { AuthMiddleware } from '../middleware/auth';
import { UserMiddleware } from '../middleware/userCheck';
import { GetCommentsOnPostHandler } from '../migration/comments/getOnPost';
import { SubmitHandler } from '../migration/comments/submit';

const CommentsRouter = Router();

const upload = multer();

CommentsRouter.post('/submit', AuthMiddleware, upload.none(), SubmitHandler);
CommentsRouter.get('/getOnPost', UserMiddleware, GetCommentsOnPostHandler);

export default CommentsRouter;
