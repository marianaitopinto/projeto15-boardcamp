import express, { json } from 'express';
import cors from 'cors';
import routers from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(routers);

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});