import { Router } from 'express';

import { CreateHandler } from '../../migration/sub/create';
import { GetMyListHandler } from '../../migration/sub/my-list';

const SubRouter = Router();

SubRouter.post('/create', CreateHandler);
SubRouter.get('/my-list', GetMyListHandler);

export default SubRouter;
