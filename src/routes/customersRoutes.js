import { Router } from 'express';

import {getCustomers, createCustomer, getCustomerId, updateCustomer} from '../controllers/customersController.js';

import {validateNewCustomer, validateUpdateCustomer} from '../middlewares/customersMiddleware.js'

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.post('/customers', validateNewCustomer, createCustomer);
customersRouter.get('/customers/:id', getCustomerId);
customersRouter.put('/customers/:id', validateUpdateCustomer, updateCustomer)

export default customersRouter;