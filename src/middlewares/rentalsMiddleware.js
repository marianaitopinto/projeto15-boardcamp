import db from '../db.js';

import rentalSchema from '../schemas/rentalsSchema.js';

export async function validateRental(req, res, next) {
    const rental = req.body;

    const rentalValidation = rentalSchema.validate(rental, {abortEarly: false});

    if (rentalValidation.error) {
        const validationErrors = rentalValidation.error.details.map(detail => detail.message);
        console.log(`Validation errors: `, validationErrors);
        return res.status(400).send(validationErrors);
    }

    if (parseInt(rental.daysRented) <= 0) {
        return res.sendStatus(400);
    };

    try {
        const gameExists = await db.query(`
            SELECT id FROM games WHERE id=$1
        `, [rental.gameId]);

        if (gameExists.rowCount === 0) {
            return res.sendStatus(400);
        };

        const customerExists = await db.query(`
            SELECT id FROM customers WHERE id=$1
        `, [rental.customerId]);

        if (customerExists.rowCount === 0) {
            console.log(customerExists.rows[0]);
            return res.sendStatus(400);
        };

        const gameDetails = await db.query(`
            SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" is null
        `, [rental.gameId]);

        const gameStock = gameExists.rows[0].stockTotal;
        const gameRentals = gameDetails.rowCount;

        if (gameStock - gameRentals === 0) {
            return res.sendStatus(400);
        };

        next();
        
    } catch (error) {
        return res.status(500).send(error);
    }
}