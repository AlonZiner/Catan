import React, { useState } from 'react';
import Select from 'react-select';
import { Game } from '../types';

// Define the props for the filter form component
interface FilterFormProps {
  games: Game[];
  onFilter: (filteredGames: Game[]) => void;
}

// Extract unique values for player names, expansions, and pick orders
const extractUniqueValues = (games: Game[]) => {
  const playerNames = [...new Set(games.flatMap(game => game.players.map(player => player.name)))];
  const expansions = [...new Set(games.map(game => game.expansion))];

  return { playerNames, expansions };
};

const FilterForm: React.FC<FilterFormProps> = ({ games, onFilter }) => {
  const { playerNames, expansions } = extractUniqueValues(games);

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedExpansions, setSelectedExpansions] = useState<string[]>([]);

  const handleFilter = () => {
    const filteredGames = games.filter(game => {
      const playersMatch = selectedPlayers.length === 0 || game.players.some(player => selectedPlayers.includes(player.name));
      const expansionsMatch = selectedExpansions.length === 0 || selectedExpansions.includes(game.expansion);

      return playersMatch && expansionsMatch;
    });

    onFilter(filteredGames);
  };

  return (
    <div className="p-4 bg-background text-text rounded-lg shadow-md">
      {/* <h2 className="text-xl font-bold mb-4">Filter Games</h2> */}

      <div className="mb-4">
        <label className="block mb-2">Player Names</label>
        <Select
          isMulti
          options={playerNames.map(name => ({ value: name, label: name }))}
          className="text-black"
          onChange={(selected) => setSelectedPlayers(selected.map(option => option.value))}
        />
      </div>

      <div>
        <label className="block mb-2">Expansions</label>
        <Select
          isMulti
          options={expansions.map(expansion => ({ value: expansion, label: expansion }))}
          className="text-black"
          onChange={(selected) => setSelectedExpansions(selected.map(option => option.value))}
        />
      </div>

      <button
        className="py-2 px-4 rounded :hover:bg-primary focus:outline-none"
        onClick={handleFilter}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterForm;
