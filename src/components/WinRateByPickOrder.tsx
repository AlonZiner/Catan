// interfaces
export interface Game {
    id: number;
    date: string;
    expansion: string;
    winner: string;
    players: Player[];
}

export interface Player {
    name: string;
    score: number;
    pickOrder: number | null;
}


interface WinRateByPickOrderProps {
  games: Game[];
  player: string;
}

export const WinRateByPickOrder = ({ games, player }: WinRateByPickOrderProps) => {
  const playerGames = games.filter(game => game.players.some(p => p.name === player));
  const pickOrders = [...new Set(playerGames.flatMap(game => game.players.filter(p => p.pickOrder !== null).map(p => p.pickOrder)))];
  const expansions = [...new Set(playerGames.map(game => game.expansion))];

  const calculateWinRate = (filteredGames: Game[]) => {
    const wins = filteredGames.filter(game => game.winner === player).length;
    return filteredGames.length ? (wins / filteredGames.length * 100) : 0;
  };

  const winRates = pickOrders.map(order => {
    const relevantGames = playerGames.filter(game => 
      game.players.find(p => p.name === player && p.pickOrder === order)
    );
    return {
      pickOrder: order,
      winRate: calculateWinRate(relevantGames)
    };
  });

  const expansionWinRates = expansions.map(expansion => {
    const expansionGames = playerGames.filter(game => game.expansion === expansion);
    const pickOrderWinRates = pickOrders.map(order => {
      const relevantGames = expansionGames.filter(game => 
        game.players.find(p => p.name === player && p.pickOrder === order)
      );
      return {
        pickOrder: order,
        winRate: calculateWinRate(relevantGames)
      };
    });
    return {
      expansion,
      overallWinRate: calculateWinRate(expansionGames),
      pickOrderWinRates
    };
  });

  const overallWinRate = calculateWinRate(playerGames);

  return (
   
    <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <h2 className="text-xl font-bold mt-4 mb-4">Overall Win Rate: {overallWinRate.toFixed(2)}%</h2>

      <h2 className="text-xl font-bold mb-2">Win Rate by Pick Order: {player}</h2>
      {winRates.sort((p1, p2) => p1.pickOrder! - p2.pickOrder!).map(({ pickOrder, winRate }) => (
        <p key={pickOrder}>Pick Order {pickOrder}: {winRate.toFixed(2)}%</p>
      ))}

      {expansionWinRates.map(({ expansion, overallWinRate, pickOrderWinRates }) => (
        <div key={expansion}>
          <h3 className="text-lg font-bold mt-4">{expansion}</h3>
          <p>Overall Win Rate: {overallWinRate.toFixed(2)}%</p>
          {pickOrderWinRates.sort((p1, p2) => p1.pickOrder! - p2.pickOrder!).map(({ pickOrder, winRate }) => (
            <p key={pickOrder}>Pick Order {pickOrder}: {winRate.toFixed(2)}%</p>
          ))}
        </div>
      ))}
    </div>
  );
};
