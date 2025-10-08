import { Router } from 'express';

import { CreateHandler } from '../../migration/sub/create';

const SubRouter = Router();

SubRouter.post('/create', CreateHandler);

export default SubRouter;
