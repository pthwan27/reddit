import { Router } from 'express';

import { AuthMiddleware } from '../middleware/auth';
import { UserMiddleware } from '../middleware/userCheck';
import { GetPostDetailHandler } from '../migration/post/comments';
import { PostUpload } from '../migration/post/fileUpload';
import { ListBySubHandler } from '../migration/post/listBySub';
import { SubmitHandler } from '../migration/post/submit';

const PostRouter = Router();

PostRouter.post('/submit', AuthMiddleware, PostUpload, SubmitHandler);
PostRouter.get('/list/:slug', UserMiddleware, ListBySubHandler);
PostRouter.get(
  '/comments/:postId/:postSlug',
  UserMiddleware,
  GetPostDetailHandler
);

export default PostRouter;
