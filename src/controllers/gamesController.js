import db from "./../db.js";

export async function listGames(req, res) {
    const { name } = req.query;

    try {
        if (!name) {
          const { rows: games } = await db.query(`
            SELECT 
              games.*, 
              categories.name as "categoryName" 
            FROM games 
              JOIN categories ON games."categoryId"=categories.id
          `);
    
          res.send(games);
        } else {
          const { rows: games } = await db.query(`
            SELECT 
              games.*, 
              categories.name as "categoryName" 
            FROM games 
             JOIN categories ON games."categoryId"=categories.id 
            WHERE LOWER(games.name) LIKE LOWER($1)
          `, [`${name}%`]);
    
          res.send(games);
        }
      } catch (error) {
        res.sendStatus(500);
      }
}

export async function createGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await db.query(`
            INSERT INTO
            games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5)
        `, [name, image, parseInt(stockTotal), parseInt(categoryId), parseInt(pricePerDay)]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}