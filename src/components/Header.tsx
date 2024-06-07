import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="bg-brown-800 text-white p-4">
      <Link className="text-white text-xl font-bold" to="/">Catan Game History</Link>
      <div className="flex space-x-4">
        <Link className="text-white hover:text-orange-500" to="/">Home</Link>
        <Link className="text-white hover:text-orange-500" to="/add-game">Add Game</Link>
      </div>
    </nav>
  );
}

export default Header;
