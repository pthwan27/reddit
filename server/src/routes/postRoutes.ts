import { Router } from 'express';

import { AuthMiddleware } from '../middleware/auth';
import { UserMiddleware } from '../middleware/userCheck';
import { GetPostDetailHandler } from '../migration/post/detail';
import { PostUpload } from '../migration/post/fileUpload';
import { ListBySubHandler } from '../migration/post/listBySub';
import { SubmitHandler } from '../migration/post/submit';

const PostRouter = Router();

PostRouter.post('/submit', AuthMiddleware, PostUpload, SubmitHandler);
PostRouter.get('/list/:id', UserMiddleware, ListBySubHandler);
PostRouter.get('/:identifier', UserMiddleware, GetPostDetailHandler);

export default PostRouter;
