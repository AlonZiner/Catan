import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 h-full z-40 
            ${isOpen ? "w-64" : "w-0"}
            bg-opacity-20 overflow-x-hidden transition-width duration-300 ease-in-out`}
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <nav className={`mt-16 ${isOpen ? "block" : "hidden"}`}>
          <ul className="text-text-color" onClick={toggleSidebar}>
            <li className="px-4 py-2 hover:bg-primary-color hover:bg-opacity-50">
              <Link to="/">Dashborad</Link>
            </li>
            <li className="px-4 py-2 hover:bg-primary-color hover:bg-opacity-50">
              <Link to="/game-history">Game History</Link>
            </li>
            <li className="px-4 py-2 hover:bg-primary-color hover:bg-opacity-50">
              <Link to="/statistics">Statistics</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={`fixed top-0 left-0 h-full z-30 bg-bg-color ${
          isOpen ? "opacity-50 w-full" : "opacity-0 w-0"
        } transition-opacity duration-300 ease-in-out`}
        onClick={toggleSidebar}
      ></div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Toggle Button */}

      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 focus:outline-none"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  );
};

export default Sidebar;
