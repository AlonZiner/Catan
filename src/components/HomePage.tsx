// src/components/HomePage.tsx

import GameList from "./GameList";
import { Game } from "../types";
import gamesService from "../services/gamesService";
import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto"; // Important for Chart.js v3 compatibility

const HomePage = () => {
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    setGames(gamesService.getGames());
  }, []);

  if (!games) {
    return <div>Loading...</div>;
  }

  const getMostWinsPlayer = (games: Game[]) => {
    const winsCount: { [key: string]: number } = {};
    games.forEach((game) => {
      if (game.winner in winsCount) {
        winsCount[game.winner]++;
      } else {
        winsCount[game.winner] = 1;
      }
    });

    const mostWinsPlayer = Object.keys(winsCount).reduce((a, b) =>
      winsCount[a] > winsCount[b] ? a : b
    );

    return { name: mostWinsPlayer, wins: winsCount[mostWinsPlayer] };
  };

  const getMostPointsPlayer = (games: Game[]) => {
    const pointsCount: { [key: string]: number } = {};
    games.forEach((game) => {
      game.players.forEach((player) => {
        if (player.name in pointsCount) {
          pointsCount[player.name] += player.score;
        } else {
          pointsCount[player.name] = player.score;
        }
      });
    });

    const mostPointsPlayer = Object.keys(pointsCount).reduce((a, b) =>
      pointsCount[a] > pointsCount[b] ? a : b
    );

    return { name: mostPointsPlayer, points: pointsCount[mostPointsPlayer] };
  };

  const getMostFrequentExpansion = (games: Game[]) => {
    const expansionCount: { [key: string]: number } = {};
    games.forEach((game) => {
      if (game.expansion in expansionCount) {
        expansionCount[game.expansion]++;
      } else {
        expansionCount[game.expansion] = 1;
      }
    });

    return Object.keys(expansionCount).reduce((a, b) =>
      expansionCount[a] > expansionCount[b] ? a : b
    );
  };

  const getMostRecentGameDate = (games: Game[]) => {
    return games.reduce((latest, game) =>
      new Date(game.date) > new Date(latest.date) ? game : latest
    ).date;
  };

  const getHighestScore = (games: Game[]) => {
    let highestScore = 0;
    games.forEach((game) => {
      game.players.forEach((player) => {
        if (player.score > highestScore) {
          highestScore = player.score;
        }
      });
    });
    return highestScore;
  };

  const getMostFrequentPlayer = (games: Game[]) => {
    const playerCount: { [key: string]: number } = {};
    games.forEach((game) => {
      game.players.forEach((player) => {
        if (player.name in playerCount) {
          playerCount[player.name]++;
        } else {
          playerCount[player.name] = 1;
        }
      });
    });

    const mostFrequentPlayer = Object.keys(playerCount).reduce((a, b) =>
      playerCount[a] > playerCount[b] ? a : b
    );

    return { name: mostFrequentPlayer, games: playerCount[mostFrequentPlayer] };
  };

  const getAverageScore = (games: Game[]) => {
    let totalScore = 0;
    let totalPlayers = 0;
    games.forEach((game) => {
      game.players.forEach((player) => {
        totalScore += player.score;
        totalPlayers++;
      });
    });
    return totalScore / totalPlayers;
  };

  const generateAverageScoresByPlayer = (games: Game[]) => {
    const scores: { [key: string]: number } = {};
    const counts: { [key: string]: number } = {};

    games.forEach((game) => {
      game.players.forEach((player) => {
        if (player.name in scores) {
          scores[player.name] += player.score;
          counts[player.name]++;
        } else {
          scores[player.name] = player.score;
          counts[player.name] = 1;
        }
      });
    });

    const labels = Object.keys(scores);
    const data = labels.map((label) => scores[label] / counts[label]);

    return {
      labels: labels,
      datasets: [
        {
          label: "Average Score",
          data: data,
          backgroundColor: "rgba(233, 30, 99, 0.5)",
          borderColor: "rgba(233, 30, 99, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const generatePlayerParticipation = (games: Game[]) => {
    const participation: { [key: string]: number } = {};

    games.forEach((game) => {
      game.players.forEach((player) => {
        if (player.name in participation) {
          participation[player.name]++;
        } else {
          participation[player.name] = 1;
        }
      });
    });

    const labels = Object.keys(participation);
    const data = labels.map((label) => participation[label]);

    return {
      labels: labels,
      datasets: [
        {
          label: "Games",
          data: data,
          backgroundColor: "rgba(158, 36, 170, 0.5)",
          borderColor: "rgba(158, 36, 170, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const generateGameFrequencyByExpansion = (games: Game[]) => {
    const expansionCount: { [key: string]: number } = {};

    games.forEach((game) => {
      if (game.expansion in expansionCount) {
        expansionCount[game.expansion]++;
      } else {
        expansionCount[game.expansion] = 1;
      }
    });

    const labels = Object.keys(expansionCount);
    const data = labels.map((label) => expansionCount[label]);

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgba(233, 30, 99, 0.5)",
            "rgba(206, 147, 216, 0.5)",
            "rgba(158, 36, 170, 0.5)",
          ],
          borderColor: [
            "rgba(233, 30, 99, 1)",
            "rgba(206, 147, 216, 1)",
            "rgba(158, 36, 170, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const generateScoresOverTime = (games: Game[]) => {
    const latestGames = games.slice(-6);
    const scores: { [key: string]: { [key: string]: number } } = {}; // Explicitly annotate the type
    const dates = [...new Set(latestGames.map((game) => game.date))].sort();

    latestGames.forEach((game) => {
      game.players.forEach((player) => {
        if (!(player.name in scores)) {
          scores[player.name] = {};
        }
        scores[player.name][game.date] = player.score;
      });
    });

    const datasets = Object.keys(scores).map((playerName) => {
      return {
        label: playerName,
        data: dates.map((date) => scores[playerName][date] || 0),
        fill: false,
        borderColor: [
          "rgba(233, 30, 99, 0.5)",
          "rgba(206, 147, 216, 0.5)",
          "rgba(158, 36, 170, 0.5)",
          "rgba(63, 81, 181, 0.5)",
        ],
        tension: 0.1,
      };
    });

    return {
      labels: dates,
      datasets: datasets,
    };
  };

  const generatePointsDistribution = (games: Game[]) => {
    const distribution: { [key: string]: number } = {
      "0-5": 0,
      "6-10": 0,
      "11-15": 0,
      "16-20": 0,
    };

    games.forEach((game) => {
      game.players.forEach((player) => {
        if (player.score <= 5) {
          distribution["0-5"]++;
        } else if (player.score <= 10) {
          distribution["6-10"]++;
        } else if (player.score <= 15) {
          distribution["11-15"]++;
        } else {
          distribution["16-20"]++;
        }
      });
    });

    const labels = Object.keys(distribution);
    const data = labels.map((label) => distribution[label]);

    return {
      labels: labels,
      datasets: [
        {
          label: "Points",
          data: data,
          backgroundColor: "rgb(206, 147, 216)",
          borderColor: "rgba(206, 147, 216, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const generateWinsByPlayer = (games: Game[]) => {
    const winsCount: { [key: string]: number } = {};

    games.forEach((game) => {
      if (game.winner in winsCount) {
        winsCount[game.winner]++;
      } else {
        winsCount[game.winner] = 1;
      }
    });

    const labels = Object.keys(winsCount);
    const data = labels.map((label) => winsCount[label]);

    return {
      labels: labels,
      datasets: [
        {
          label: "Wins",
          data: data,
          backgroundColor: "rgba(233, 30, 99, 0.5)",
          borderColor: "rgba(233, 30, 99, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const mostWinsPlayer = getMostWinsPlayer(games);
  const mostPointsPlayer = getMostPointsPlayer(games);
  const totalGames = games.length;
  const mostFrequentExpansion = getMostFrequentExpansion(games);
  const mostRecentGameDate = getMostRecentGameDate(games);
  const highestScore = getHighestScore(games);
  const frequentPlayer = getMostFrequentPlayer(games);
  const averageScore = getAverageScore(games);

  const averageScoresByPlayer = generateAverageScoresByPlayer(games);
  const playerParticipation = generatePlayerParticipation(games);
  const gameFrequencyByExpansion = generateGameFrequencyByExpansion(games);
  const scoresOverTime = generateScoresOverTime(games);
  const pointsDistribution = generatePointsDistribution(games);
  const winsByPlayer = generateWinsByPlayer(games);

  return (
    <>
      <div className="min-h-screen bg-var(--bg-color) text-var(--text-color) p-5">
        <div className="flex flex-wrap -mx-4 mb-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg h-36">
              <h2 className="text-2xl font-semibold mb-2">
                Player with Most Wins
              </h2>
              <p className="text-lg">Name: {mostWinsPlayer.name}</p>
              <p className="text-lg">Wins: {mostWinsPlayer.wins}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg h-36">
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
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg h-36">
              <h2 className="text-2xl font-semibold mb-2">
                Total Games Played
              </h2>
              <p className="text-lg">{totalGames}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg h-36">
              <h2 className="text-2xl font-semibold mb-2">
                Most Frequent Expansion
              </h2>
              <p className="text-lg">{mostFrequentExpansion}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg h-36">
              <h2 className="text-2xl font-semibold mb-2">
                Most Recent Game Date
              </h2>
              <p className="text-lg">
                {new Date(mostRecentGameDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg h-36">
              <h2 className="text-2xl font-semibold mb-2">
                Highest Score in a Single Game
              </h2>
              <p className="text-lg">{highestScore}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg h-36">
              <h2 className="text-2xl font-semibold mb-2">
                Most Frequent Player
              </h2>
              <p className="text-lg">Name: {frequentPlayer.name}</p>
              <p className="text-lg">Games: {frequentPlayer.games}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="bg-var(--primary-color) rounded-lg p-6 shadow-lg h-36">
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
            <h2 className="text-2xl font-semibold mb-2">
              Game Frequency by Expansion
            </h2>
            <Pie data={gameFrequencyByExpansion} />
          </div>
        </div>
        <div className="w-full px-4 mb-4">
          <div className="bg-primary-color rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">
              Player Participation
            </h2>
            <Bar data={playerParticipation} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-4 mb-4">
        <div className="w-full px-4 mb-4">
          <div className="bg-primary-color rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Scores Over Time</h2>
            <Line data={scoresOverTime} />
          </div>
        </div>
      </div>

      <div className="w-full px-4 mb-4">
        <div className="bg-primary-color rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">
            Average Scores by Player
          </h2>
          <Bar data={averageScoresByPlayer} />
        </div>
      </div>

      <div className="homepage container mx-auto px-4 py-8">
        <GameList games={games} />
      </div>
    </>
  );
};

export default HomePage;
