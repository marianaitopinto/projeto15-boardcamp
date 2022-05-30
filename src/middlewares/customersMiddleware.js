import db from '../db.js';

import customerSchema from '../schemas/customersSchema.js';

export async function validateNewCustomer(req, res, next) {
    const customer = req.body;

    const customerValidation = customerSchema.validate(customer, {abortEarly: false});

    if (customerValidation.error) {
        const validationErrors = customerValidation.error.details.map(detail => detail.message);
        console.log(`Validation errors: `, validationErrors);
        return res.status(400).send(validationErrors);
    }

    try {

        const checkCpfExists = await db.query(`
        SELECT * FROM customers 
        WHERE cpf=$1
        `, [customer.cpf]);

        if (checkCpfExists.rowCount > 0) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function validateUpdateCustomer(req, res, next) {
    const { id } = req.params;
    const customer = req.body;

    const customerValidation = customerSchema.validate(customer, {abortEarly: false});

    if (customerValidation.error) {
        const validationErrors = customerValidation.error.details.map(detail => detail.message);
        console.log(`Validation errors: `, validationErrors);
        return res.status(400).send(validationErrors);
    }
    try {
        const checkCpf = await db.query(`
            SELECT * FROM customers WHERE cpf=$1 AND id!=$2
        `, [customer.cpf, id]);

        if (checkCpf.rowCount > 0 && checkCpf.rows[0].id != id) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}