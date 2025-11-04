import { Router } from 'express';

import { AuthMiddleware } from '../middleware/auth';
import { VoteHandler } from '../migration/vote';

const VoteRouter = Router();
VoteRouter.patch('/', AuthMiddleware, VoteHandler);

export default VoteRouter;
