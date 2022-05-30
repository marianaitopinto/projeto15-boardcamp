import db from '../db.js';

import gamesSchema from '../schemas/gamesSchema.js';

export async function validateGame(req, res, next) {
    const game = req.body;

    const gameValidation = gamesSchema.validate(game, {abortEarly: false});

    if (gameValidation.error) {
        const validationErrors = gameValidation.error.details.map(detail => detail.message);
        console.log(`Validation errors: `, validationErrors);
        return res.status(400).send(validationErrors);
    }

    if ((parseInt(game.stockTotal) <= 0) || (parseInt(game.pricePerDay) <= 0) || (game.name === "")) {
        return res.sendStatus(400);
    }

    try {
        const checkCategoryExists = await db.query(`
        SELECT * FROM categories 
        WHERE id=$1
        `, [game.categoryId]);

        if (checkCategoryExists.rowCount === 0) {
            return res.sendStatus(400);
        }

        const checkGameExists = await db.query(`
        SELECT * FROM games 
        WHERE name=$1
        `, [game.name]);

        if (checkGameExists.rowCount > 0) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        res.status(500).send(error);
    }
}