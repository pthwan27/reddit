import { Router } from 'express';

import { AuthMiddleware } from '../../middleware/auth';
import { CreateHandler } from '../../migration/sub/create';
import { upload } from '../../migration/sub/create/fileUpload';
import { GetSubDetailHandler } from '../../migration/sub/detail';
import { GetMyListHandler } from '../../migration/sub/my-list';
import { iconUpload } from '../../migration/sub/upload/fileUpload';
import { IconUploadHandler } from '../../migration/sub/upload/icon';

const SubRouter = Router();

SubRouter.post('/create', AuthMiddleware, upload, CreateHandler);
SubRouter.get('/my-list', AuthMiddleware, GetMyListHandler);
SubRouter.get('/:id', AuthMiddleware, GetSubDetailHandler);

SubRouter.patch(
  '/:id/uploadImage/icon',
  iconUpload,
  AuthMiddleware,
  IconUploadHandler
);
export default SubRouter;
