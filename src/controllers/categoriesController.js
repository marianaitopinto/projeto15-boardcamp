import db from "./../db.js";

export async function listCategories(req, res) {
    try {
        const categories = await db.query(`
            SELECT * FROM categories
        `)

        res.send(categories.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function createCategories(req, res) {
    const categorie = req.body;

    try {
        await db.query(`
        INSERT INTO categories (name) 
        VALUES ($1)
    `, [categorie.name]);

    res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}