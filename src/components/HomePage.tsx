// src/components/HomePage.tsx

// import React, { useState, useEffect } from "react";
import GameList from "./GameList";
import { Game } from "../types";
// import Chart from './Chart';
import gamesService from "../services/gamesService";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    setGames(gamesService.getGames());
  }, []);

  if (!games) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-brown-800 mb-4">Game History</h1>
      {/* <Chart games={games} /> */}
      <GameList games={games} />
    </div>
  );
};

export default HomePage;
