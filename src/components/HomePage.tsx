// src/components/HomePage.tsx

import GameList from "./GameList";
import { Game } from "../types";
import gamesService from "../services/gamesService";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    setGames(gamesService.getGames());
  }, []);

  if (!games) {
    return <div>Loading...</div>;
  }

  const mostWinsPlayer = { name: "John Doe", wins: 42 };
  const mostPointsPlayer = { name: "Jane Smith", points: 1567 };
  const totalGames = 100;
  const mostFrequentExpansion = "Seafarers";
  const mostRecentGameDate = "2023-05-10T00:00:00Z";
  const highestScore = 18;
  const frequentPlayer = { name: "John Doe", games: 60 };
  const averageScore = 10.5;

  return (
    <>
      <div className="min-h-screen bg-var(--bg-color) text-var(--text-color) p-5">
        <h1 className="text-4xl font-bold mb-5">
          Welcome to the Settlers of Catan Dashboard
        </h1>

        <div className="flex flex-wrap -mx-4 mb-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">
                Player with Most Wins
              </h2>
              <p className="text-lg">Name: {mostWinsPlayer.name}</p>
              <p className="text-lg">Wins: {mostWinsPlayer.wins}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">
                Player with Most Points
              </h2>
              <p className="text-lg">Name: {mostPointsPlayer.name}</p>
              <p className="text-lg">Points: {mostPointsPlayer.points}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">
                Total Games Played
              </h2>
              <p className="text-lg">{totalGames}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">
                Most Frequent Expansion
              </h2>
              <p className="text-lg">{mostFrequentExpansion}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">
                Most Recent Game Date
              </h2>
              <p className="text-lg">
                {new Date(mostRecentGameDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">
                Highest Score in a Single Game
              </h2>
              <p className="text-lg">{highestScore}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">
                Most Frequent Player
              </h2>
              <p className="text-lg">Name: {frequentPlayer.name}</p>
              <p className="text-lg">Games: {frequentPlayer.games}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">
                Average Score per Game
              </h2>
              <p className="text-lg">{averageScore.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-brown-800 mb-4">Game History</h1>
        <GameList games={games} />
      </div>
    </>
  );
};

export default HomePage;
