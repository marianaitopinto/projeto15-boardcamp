import { Router } from 'express';

import {getCustomers, createCustomer, getCustomerId} from '../controllers/customersController.js';

import {validateNewCustomer} from '../middlewares/customersMiddleware.js'

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.post('/customers', validateNewCustomer, createCustomer);
customersRouter.get('/customers/:id', getCustomerId);

export default customersRouter;