import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Header: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="bg-primary text-background p-4 flex justify-around items-center text-center sticky top-0 z-10">
    <div className="flex">
        <h1 className="text-2xl font-bold flex-1">Settlers of Catan Game History</h1>
        <span className="flex-3">
          <button
            onClick={toggleTheme}
            className="mb-4 px-4 py-2 bg-primary text-background rounded"
          >
            {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
          </button>
        </span>
      </div>
    </header>
  );
};

export default Header;
