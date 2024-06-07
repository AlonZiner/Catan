import React from 'react';
import { Player } from '../types';

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <ul className="list-group">
      {players.map((player, index) => (
        <li className="list-group-item" key={index}>
          {player.name} (Pick Order: {player.pickOrder})
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
