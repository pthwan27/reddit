import { Router } from 'express';

import { UserMiddleware } from '../middleware/userCheck';
import { HighlightListHandler } from '../migration/highlight/list';
import { HighlightListBySubHandler } from '../migration/highlight/listBySub';

const HighlightRouter = Router();

HighlightRouter.get('/post', UserMiddleware, HighlightListHandler);
HighlightRouter.get('/post/:id', UserMiddleware, HighlightListBySubHandler);

export default HighlightRouter;
