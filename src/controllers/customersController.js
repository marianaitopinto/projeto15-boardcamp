import db from "./../db.js";

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`
            SELECT * FROM customers
        `)

        res.send(customers.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}