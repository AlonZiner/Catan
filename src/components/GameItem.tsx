import { Game } from '../types';

interface GameItemProps {
  game: Game;
}

const GameItem = ({ game } : GameItemProps) => {
  return (
    <div className="game-item bg-white border border-gray-300 p-4 mb-4 rounded">
      <h5 className="text-lg font-bold mb-1">{game.date} - {game.expansion}</h5>
      <p className="text-base mb-1">Winner: {game.winner}</p>
      <small className="text-sm">Players: {game.players.map(p => p.name).join(', ')}</small>
    </div>
  );
}

export default GameItem;
