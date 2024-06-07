// src/components/HomePage.tsx

// import React, { useState, useEffect } from "react";
import GameList from "./GameList";
import { Game } from "../types";
// import Chart from './Chart';

const HomePage: React.FC = () => {
    const games: Game[] = [
        {
          date: "2024-01-01",
          expansion: "Base Game",
          winner: "Alice",
          players: [
            { name: "Alice", pickOrder: 1 },
            { name: "Bob", pickOrder: 2 },
            { name: "Charlie", pickOrder: 3 }
          ]
        },
        {
          date: "2024-02-15",
          expansion: "Seafarers",
          winner: "Bob",
          players: [
            { name: "Bob", pickOrder: 1 },
            { name: "Alice", pickOrder: 2 },
            { name: "Charlie", pickOrder: 3 }
          ]
        },
        {
          date: "2024-03-10",
          expansion: "Cities & Knights",
          winner: "Charlie",
          players: [
            { name: "Charlie", pickOrder: 1 },
            { name: "Alice", pickOrder: 2 },
            { name: "Bob", pickOrder: 3 }
          ]
        },
        {
          date: "2024-04-20",
          expansion: "Base Game",
          winner: "Alice",
          players: [
            { name: "Alice", pickOrder: 1 },
            { name: "Charlie", pickOrder: 2 },
            { name: "Bob", pickOrder: 3 }
          ]
        },
        {
          date: "2024-05-05",
          expansion: "Base Game",
          winner: "Bob",
          players: [
            { name: "Bob", pickOrder: 1 },
            { name: "Charlie", pickOrder: 2 },
            { name: "Alice", pickOrder: 3 }
          ]
        },
        {
          date: "2024-06-18",
          expansion: "Seafarers",
          winner: "Alice",
          players: [
            { name: "Alice", pickOrder: 1 },
            { name: "Bob", pickOrder: 2 },
            { name: "Charlie", pickOrder: 3 }
          ]
        },
        {
          date: "2024-07-22",
          expansion: "Cities & Knights",
          winner: "Bob",
          players: [
            { name: "Bob", pickOrder: 1 },
            { name: "Alice", pickOrder: 2 },
            { name: "Charlie", pickOrder: 3 }
          ]
        },
        {
          date: "2024-08-11",
          expansion: "Seafarers",
          winner: "Charlie",
          players: [
            { name: "Charlie", pickOrder: 1 },
            { name: "Bob", pickOrder: 2 },
            { name: "Alice", pickOrder: 3 }
          ]
        },
        {
          date: "2024-09-30",
          expansion: "Cities & Knights",
          winner: "Alice",
          players: [
            { name: "Alice", pickOrder: 1 },
            { name: "Charlie", pickOrder: 2 },
            { name: "Bob", pickOrder: 3 }
          ]
        },
        {
          date: "2024-10-15",
          expansion: "Base Game",
          winner: "Bob",
          players: [
            { name: "Bob", pickOrder: 1 },
            { name: "Alice", pickOrder: 2 },
            { name: "Charlie", pickOrder: 3 }
          ]
        }
      ];

  return (
    <div className="homepage container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-brown-800 mb-4">Game History</h1>
      {/* <Chart games={games} /> */}
      <GameList games={games} />
    </div>
  );
};

export default HomePage;
