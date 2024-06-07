import React from 'react';
import GameItem from './GameItem';
import { Game } from '../types';

interface GameListProps {
  games: Game[];
}

const GameList: React.FC<GameListProps> = ({ games }) => {
    return (
      <div className="game-list">
        <h3 className="text-lg font-bold mb-4">Game List</h3>
        {games.map(game => (
          <GameItem key={game.date} game={game} />
        ))}
      </div>
    );
  }

export default GameList;
