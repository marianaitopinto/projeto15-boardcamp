import { Router } from 'express';

import {listGames, createGames} from '../controllers/gamesController.js';

import { validateGame } from '../middlewares/gamesMiddleware.js';

const gamesRouter = Router();

gamesRouter.get('/games', listGames);
gamesRouter.post('/games', validateGame, createGames);

export default gamesRouter;