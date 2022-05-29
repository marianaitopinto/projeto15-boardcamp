import { Router } from 'express';

import categoriesRouter from './categoriesRouter.js';
import gamesRouter from './gamesRouter.js';

const routers = Router();

routers.use(categoriesRouter);
routers.use(gamesRouter);

export default routers;