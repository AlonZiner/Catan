import React from 'react';
import { Game } from '../types';

interface GameItemProps {
  game: Game;
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
  return (
    <div className="game-item bg-background border border-secondary p-4 mb-4 rounded">
      <h5 className="text-lg font-bold mb-1 text-primary">{game.date} - {game.expansion}</h5>
      <p className="text-base mb-1 text-text">Winner: {game.winner}</p>
      <small className="text-sm text-text">Players: {game.players.map(p => p.name).join(', ')}</small>
    </div>
  );
}

export default GameItem;
