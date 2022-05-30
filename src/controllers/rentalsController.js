import db from "./../db.js";

import dayjs from 'dayjs';

export async function listRentals(req, res) {
    const { customerId, gameId } = req.query;

    try {
        const { rows: rentals } = await db.query(`
      SELECT 
        rentals.*,
        customers.name AS "customerName",
        customers.id AS "customerId",
        games.id AS "gameId",
        games.name AS "gameName", 
        categories.name AS "categoryName", 
        categories.id AS "categoryId" 
      FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        JOIN categories ON games."categoryId" = categories.id
        ${customerId ? `WHERE customers.id = ${parseInt(customerId)}` : ""}
        ${gameId ? `WHERE games.id = ${parseInt(gameId)}` : ""}
      `);

        const listRentals = rentals.map((r) => {
            const entry = {
                ...r,
                rentDate: dayjs(r.rentDate).format("YYYY-MM-DD"),
                customer: {
                    id: r.customerId,
                    name: r.customerName,
                },
                game: {
                    id: r.gameId,
                    name: r.gameName,
                    categoryId: r.categoryId,
                    categoryName: r.categoryName,
                },
            };

            delete entry.customerName;

            delete entry.gameName;

            delete entry.categoryId;
            delete entry.categoryName;

            return entry;
        });
        res.send(listRentals);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    const rentDay = dayjs().format("YYYY-MM-DD");
    const toReturnDate = null;
    const delayFee = null;

    try {
        const { rows: pricePerDay } = await db.query(
            `
      SELECT 
        games."pricePerDay" 
      FROM games 
        WHERE id=$1
      `,
            [gameId]
        );

        const rentalPrice = pricePerDay[0].pricePerDay * daysRented;

        await db.query(
            `
      INSERT INTO 
        rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")  
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
            [
                customerId,
                gameId,
                rentDay,
                daysRented,
                toReturnDate,
                rentalPrice,
                delayFee,
            ]
        );
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}
