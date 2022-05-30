import { Router } from 'express';

import categoriesRouter from './categoriesRouter.js';
import gamesRouter from './gamesRouter.js';
import customersRouter from './customersRoutes.js';

const routers = Router();

routers.use(categoriesRouter);
routers.use(gamesRouter);
routers.use(customersRouter);

export default routers;