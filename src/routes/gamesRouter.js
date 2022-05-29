import { Router } from 'express';

import {listGames, createGames} from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.get('/games', listGames);
gamesRouter.post('/games', createGames);

export default gamesRouter;