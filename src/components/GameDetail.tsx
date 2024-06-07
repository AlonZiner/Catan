// src/components/GameDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Game } from '../types';
import PlayerList from './PlayerList';

const GameDetail: React.FC = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    // Fetch game data by ID (date in this case)
    axios.get<Game>(`/path/to/game-history/${id}.json`)
      .then(response => setGame(response.data))
      .catch(error => console.error('Error fetching game data:', error));
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Game Detail</h1>
      <h2>{game.date} - {game.expansion}</h2>
      <p>Winner: {game.winner}</p>
      <PlayerList players={game.players} />
    </div>
  );
};

export default GameDetail;
