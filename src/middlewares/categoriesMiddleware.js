import db from '../db.js';

import categoriesSchema from '../schemas/categoriesSchema.js';

export async function validateCategories(req, res, next) {
    const category = req.body;

    if (!category.name) {
        return res.sendStatus(400);
    }

    const categoryValidation = categoriesSchema.validate(category, {abortEarly: false});

    if (categoryValidation.error) {
        const validationErrors = categoryValidation.error.details.map(detail => detail.message);
        console.log(`Validation errors: `, validationErrors);
        return res.status(422).send(validationErrors);
    }

    try {
        const checkCategoryExists = await db.query(`
        SELECT * FROM categories 
        WHERE name=$1
        `, [category.name]);

        if (checkCategoryExists.rowCount > 0) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        res.status(500).send(error);
    }

}