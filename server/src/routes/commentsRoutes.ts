import { Router } from 'express';
import multer from 'multer';

import { AuthMiddleware } from '../middleware/auth';
import { SubmitHandler } from '../migration/comments/submit';

const CommentsRouter = Router();

const upload = multer();

CommentsRouter.post('/submit', AuthMiddleware, upload.none(), SubmitHandler);
export default CommentsRouter;
