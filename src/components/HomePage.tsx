// src/components/HomePage.tsx

import GameList from "./GameList";
import { Game } from "../types";
import gamesService from "../services/gamesService";
import { useEffect, useState } from "react";
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Important for Chart.js v3 compatibility

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
  const averageScoresByPlayer = {
    labels: ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'],
    datasets: [
      {
        label: 'Average Score',
        data: [10.5, 9.8, 8.6, 7.4],
        backgroundColor: 'rgba(233, 30, 99, 0.5)',
        borderColor: 'rgba(233, 30, 99, 1)',
        borderWidth: 1,
      },
    ],
  }

  const playerParticipation = {
    labels: ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'],
    datasets: [
      {
        label: 'Games',
        data: [60, 55, 50, 45],
        backgroundColor: 'rgba(158, 36, 170, 0.5)',
        borderColor: 'rgba(158, 36, 170, 1)',
        borderWidth: 1,
      },
    ],
  }

  const gameFrequencyByExpansion = {
    labels: ['Base Game', 'Seafarers', 'Cities & Knights'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['rgba(233, 30, 99, 0.5)', 'rgba(206, 147, 216, 0.5)', 'rgba(158, 36, 170, 0.5)'],
        borderColor: ['rgba(233, 30, 99, 1)', 'rgba(206, 147, 216, 1)', 'rgba(158, 36, 170, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const scoresOverTime = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'John Doe',
        data: [10, 12, 14, 16, 18],
        fill: false,
        borderColor: 'rgba(233, 30, 99, 1)',
        tension: 0.1,
      },
      {
        label: 'Jane Smith',
        data: [15, 16, 13, 12, 10],
        fill: false,
        borderColor: 'rgba(206, 147, 216, 1)',
        tension: 0.1,
      },
    ],
  }

  const pointsDistribution = {
    labels: ['0-5', '6-10', '11-15', '16-20'],
    datasets: [
      {
        label: 'Points',
        data: [10, 25, 30, 5],
        backgroundColor: 'rgba(206, 147, 216, 0.5)',
        borderColor: 'rgba(206, 147, 216, 1)',
        borderWidth: 1,
      },
    ],
  }

  const winsByPlayer = {
    labels: ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'],
    datasets: [
      {
        label: 'Wins',
        data: [42, 36, 29, 22],
        backgroundColor: 'rgba(233, 30, 99, 0.5)',
        borderColor: 'rgba(233, 30, 99, 1)',
        borderWidth: 1,
      },
    ],
  }

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

      <div className="flex flex-wrap -mx-4 mb-4">
        <div className="w-full px-4 mb-4">
          <div className="bg-primary-color rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Wins by Player</h2>
            <Bar data={winsByPlayer} />
          </div>
        </div>
        <div className="w-full px-4 mb-4">
          <div className="bg-primary-color rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Points Distribution</h2>
            <Bar data={pointsDistribution} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-4 mb-4">
        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="bg-primary-color rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Game Frequency by Expansion</h2>
            <Pie data={gameFrequencyByExpansion} />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="bg-primary-color rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Scores Over Time</h2>
            <Line data={scoresOverTime} />
          </div>
        </div>
      </div>

      <div className="w-full px-4 mb-4">
          <div className="bg-primary-color rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Player Participation</h2>
            <Bar data={playerParticipation} />
          </div>
        </div>

      <div className="w-full px-4 mb-4">
          <div className="bg-primary-color rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Average Scores by Player</h2>
            <Bar data={averageScoresByPlayer} />
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
