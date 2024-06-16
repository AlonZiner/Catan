import { useEffect, useState } from "react";
import { Game } from "../types";
// import { HeadToHeadStats } from "./HeadToHeadStats";
import { WinRateAgainstOthers } from "./WinRateAgainstOthers";
import { WinRateByPickOrder } from "./WinRateByPickOrder";
import gamesService from "../services/gamesService";
import Select from "react-select";

export const Statistics = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [playerNames, setplayerNames] = useState<string[]>([]);

  useEffect(() => {
    const gameList = gamesService.getGames();
    setGames(gameList);
    setplayerNames([
      ...new Set(
        gameList.flatMap((game) => game.players.map((player) => player.name))
      ),
    ]);
  }, []);

  if (!games) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <Select
          placeholder="Select Player..."
          isMulti={false}
          options={playerNames.map((name) => ({ value: name, label: name }))}
          className="text-black"
          onChange={(selected) => setSelectedPlayer(selected!.label)}
        />
      </div>

      {selectedPlayer && (
        <div>
          {/* <div>
        <HeadToHeadStats games={games} playerA="עדס" playerB="זינר" />
      </div> */}
          <div>
            <WinRateByPickOrder games={games} player={selectedPlayer} />
          </div>

          <div>
            <WinRateAgainstOthers games={games} player={selectedPlayer} />
          </div>

        </div>
      )}
    </div>
  );
};
