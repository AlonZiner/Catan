import React, { useState } from 'react';
import GameItem from './GameItem';
import { Game } from '../types';

interface GameListProps {
  games: Game[];
}

const GameList = ({ games } : GameListProps) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [filterWinner, setFilterWinner] = useState<string>('');

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterWinner(event.target.value);
  };

  const parseDateString = (dateString: string): Date => {
    const parts = dateString.split('/');
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  };

  const sortedGames = [...games].sort((a, b) => {
    if (sortField) {
      const aValue = a[sortField as keyof Game];
      const bValue = b[sortField as keyof Game];
      
      if (sortField === 'date') {
        // For date field, parse the date strings to Date objects for comparison
        const aDate = parseDateString(aValue as string);
        const bDate = parseDateString(bValue as string);
        if (sortOrder === 'asc') {
          return aDate > bDate ? 1 : -1;
        } else {
          return aDate < bDate ? 1 : -1;
        }
      } else {
        // For other fields, perform a regular string comparison
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      }
    }
    return 0;
  });

  const filteredGames = sortedGames.filter((game) =>
    game.winner.toLowerCase().includes(filterWinner.toLowerCase())
  );

  return (
    <div className="game-list">
      <div className="controls mb-4">
        <div className="filter-controls mb-4">
          <input
            type="text"
            placeholder="Filter by winner"
            value={filterWinner}
            onChange={handleFilter}
            className="px-2 py-1 border border-secondary rounded"
          />
        </div>
        <div className="sort-controls mb-2">
          <button
            onClick={() => handleSort('date')}
            className="mr-2 px-4 py-2 bg-primary text-background rounded"
          >
            Sort by Date
          </button>
          <button
            onClick={() => handleSort('winner')}
            className="px-4 py-2 bg-primary text-background rounded"
          >
            Sort by Winner
          </button>
        </div>
      </div>
      {filteredGames.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
