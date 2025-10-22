import { Router } from 'express';

import { AuthMiddleware } from '../middleware/auth';
import { profileUpload } from '../migration/user/upload/fileUpload';
import { ProfileUploadHandler } from '../migration/user/upload/profile';

const UserRouter = Router();

UserRouter.patch(
  '/:id/uploadImage/profile',
  profileUpload,
  AuthMiddleware,
  ProfileUploadHandler
);

export default UserRouter;
