import { Router } from 'express';

import {listRentals, createRental} from '../controllers/rentalsController.js';

import { validateRental } from '../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', listRentals);
rentalsRouter.post('/rentals', validateRental, createRental);

export default rentalsRouter;