import { Router } from 'express';

import { AuthMiddleware } from '../middleware/auth';
import { UserMiddleware } from '../middleware/userCheck';
import { CreateHandler } from '../migration/sub/create';
import { SubUpload } from '../migration/sub/create/fileUpload';
import { GetSubDetailHandler } from '../migration/sub/detail';
import { GetMyListHandler } from '../migration/sub/my-list';
import { GetPopularSubsHandler } from '../migration/sub/popular';
import { SubscribeHandler } from '../migration/sub/subscribe';
import { BannerUploadHandler } from '../migration/sub/upload/banner';
import { bannerUpload, iconUpload } from '../migration/sub/upload/fileUpload';
import { IconUploadHandler } from '../migration/sub/upload/icon';

const SubRouter = Router();

SubRouter.post('/create', AuthMiddleware, SubUpload, CreateHandler);
SubRouter.get('/my-list', AuthMiddleware, GetMyListHandler);
SubRouter.get('/popular', GetPopularSubsHandler);
SubRouter.get('/:slug', UserMiddleware, GetSubDetailHandler);
SubRouter.patch('/:id/subscribe', UserMiddleware, SubscribeHandler);

SubRouter.patch(
  '/:slug/uploadImage/icon',
  AuthMiddleware,
  iconUpload,
  IconUploadHandler
);
SubRouter.patch(
  '/:slug/uploadImage/banner',
  AuthMiddleware,
  bannerUpload,
  BannerUploadHandler
);
export default SubRouter;
