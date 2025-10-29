import { Router } from 'express';

import { AuthMiddleware } from '../middleware/auth';
import { ListBySubHandler } from '../migration/post/listBySub';
import { SubmitHandler } from '../migration/post/submit';

const PostRouter = Router();

PostRouter.post('/submit', AuthMiddleware, SubmitHandler);
PostRouter.get('/list/:slug', AuthMiddleware, ListBySubHandler);

export default PostRouter;
