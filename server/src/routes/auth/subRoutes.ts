import { Router } from 'express';

import { AuthMiddleware } from '../../middleware/auth';
import { CreateHandler, upload } from '../../migration/sub/create';
import { GetSubDetailHandler } from '../../migration/sub/detail';
import { GetMyListHandler } from '../../migration/sub/my-list';

const SubRouter = Router();

SubRouter.post('/create', AuthMiddleware, upload, CreateHandler);
SubRouter.get('/my-list', AuthMiddleware, GetMyListHandler);
SubRouter.get('/:id', AuthMiddleware, GetSubDetailHandler);
export default SubRouter;
