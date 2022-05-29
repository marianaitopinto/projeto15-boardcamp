import { Router } from 'express';

import {listCategories, createCategories} from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);
categoriesRouter.post('/categories', createCategories);

export default categoriesRouter;