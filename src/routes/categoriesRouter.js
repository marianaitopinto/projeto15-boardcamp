import { Router } from 'express';

import {listCategories, createCategories} from '../controllers/categoriesController.js';

import { validateCategories } from '../middlewares/categoriesMiddleware.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);
categoriesRouter.post('/categories', validateCategories, createCategories);

export default categoriesRouter;