import { Game } from "../types";

interface HeadToHeadStatsProps {
  games: Game[];
  playerA: string;
  playerB: string;
}

export const HeadToHeadStats = ({
  games,
  playerA,
  playerB,
}: HeadToHeadStatsProps) => {
  const headToHeadGames = games.filter(
    (game) =>
      game.players.some((player) => player.name === playerA) &&
      game.players.some((player) => player.name === playerB)
  );

  const winsA = headToHeadGames.filter(
    (game) => game.winner === playerA
  ).length;
  const winsB = headToHeadGames.filter(
    (game) => game.winner === playerB
  ).length;
  const totalGames = headToHeadGames.length;

  return (
    <div className="w-full md:w-1/2 px-4 mb-4">
      <div className="rounded-lg p-6 shadow-lg h-36">
        <h2 className="text-2xl font-semibold mb-2">Head to Head: {playerA} vs {playerB}</h2>
        <p>Total Games: {totalGames}</p>
        <p>{playerA} Wins: {winsA}</p>
        <p>{playerB} Wins: {winsB}</p>
      </div>
    </div>
  );
};
