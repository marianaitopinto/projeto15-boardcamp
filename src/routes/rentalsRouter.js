import { Router } from 'express';

import {listRentals, createRental, finalizeRental} from '../controllers/rentalsController.js';

import { validateRental } from '../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', listRentals);
rentalsRouter.post('/rentals', validateRental, createRental);
rentalsRouter.post('/rentals/:id/return', finalizeRental);

export default rentalsRouter;