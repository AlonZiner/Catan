import { Game } from '../types';
import games from './games.json';

class GamesService {
    getGames(): Game[] | null {
        return games;
    }
}

const gamesService = new GamesService();

export default gamesService;
