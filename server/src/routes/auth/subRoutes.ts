import { Router } from 'express';

import { CreateHandler } from '../../migration/sub/create';

const SubRouter = Router();

SubRouter.post('/create', CreateHandler);
SubRouter.get('/my-list', CreateHandler);

export default SubRouter;
