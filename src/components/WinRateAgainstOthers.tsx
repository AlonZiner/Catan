import { Game } from "../types";

interface WinRateAgainstOthersProps {
  games: Game[];
  player: string;
}

export const WinRateAgainstOthers = ({
  games,
  player,
}: WinRateAgainstOthersProps) => {
  const opponents = [
    ...new Set(games.flatMap((game) => game.players.map((p) => p.name))),
  ].filter((opponent) => opponent !== player);

  const winRates = opponents.map((opponent) => {
    const relevantGames = games.filter(
      (game) =>
        game.players.some((p) => p.name === player) &&
        game.players.some((p) => p.name === opponent)
    );

    const wins = relevantGames.filter((game) => game.winner === player).length;
    return {
      opponent,
      winRate: relevantGames.length ? (wins / relevantGames.length) * 100 : 0,
    };
  });

  return (
    <div
      className="p-4 rounded-lg shadow-md"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <h2 className="text-xl font-bold mb-2">
        Win Rate Against Others: {player}
      </h2>
      {winRates.map(({ opponent, winRate }) => (
        <p key={opponent}>
          {opponent}: {winRate.toFixed(2)}%
        </p>
      ))}
    </div>
  );
};
