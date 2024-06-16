import { useEffect, useState } from "react";
import gamesService from "../services/gamesService";
import { Game } from "../types";
import GameList from "./GameList";

export const GameHistory = () => {
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    setGames(gamesService.getGames());
  }, []);

  if (!games) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage container mx-auto px-4 py-8">
      <GameList games={games} />
    </div>
  );
};
