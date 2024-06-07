// // src/components/Chart.tsx

// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Game } from '../types';

// interface ChartProps {
//   games: Game[];
// }

// const Chart: React.FC<ChartProps> = ({ games }) => {
//   const winners = games.map(game => game.winner);
//   const uniqueWinners = Array.from(new Set(winners));
//   const winnerCounts = uniqueWinners.map(winner => ({
//     winner,
//     count: winners.filter(w => w === winner).length,
//   }));

//   const data = {
//     labels: uniqueWinners,
//     datasets: [
//       {
//         label: 'Wins',
//         data: winnerCounts.map(wc => wc.count),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   return (
//     <div>
//       <Bar data={data} />
//     </div>
//   );
// };

// export default Chart;
