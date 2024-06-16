// PlayerPerformanceHeatmap.tsx
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Game } from '../types';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PlayerPerformanceHeatmapProps {
  games: Game[];
}

const PlayerPerformanceHeatmap: React.FC<PlayerPerformanceHeatmapProps> = ({ games }) => {
  // Extract player names
  const playerNames = Array.from(new Set(games.flatMap(game => game.players.map(player => player.name))));

  // Prepare heatmap data
  const heatmapData = playerNames.map(player => {
    return games.map(game => {
      const playerData = game.players.find(p => p.name === player);
      return playerData ? playerData.score : null;
    });
  });

  // Configure chart data
  const data = {
    labels: games.map(game => game.date),
    datasets: playerNames.map((player, index) => ({
      label: player,
      data: heatmapData[index],
      borderColor: 'var(--primary-color)',
      backgroundColor: 'var(--accent-color)',
      fill: false,
      tension: 0.1,
    }))
  };

  // Configure chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Game Dates',
          color: 'var(--text-color)',
        },
        ticks: {
          color: 'var(--text-color)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Scores',
          color: 'var(--text-color)',
        },
        ticks: {
          color: 'var(--text-color)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'var(--text-color)',
        }
      },
      tooltip: {
        backgroundColor: 'var(--bg-color)',
        titleColor: 'var(--text-color)',
        bodyColor: 'var(--text-color)',
        borderColor: 'var(--primary-color)',
        borderWidth: 1,
      }
    }
  };

  return (
    <div className="w-full px-4 mb-4">
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg overflow-x-scroll" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <h2 className="text-2xl font-semibold mb-4">Player Performance Heatmap</h2>
        <div style={{ height: '400px', minWidth: '600px' }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PlayerPerformanceHeatmap;
