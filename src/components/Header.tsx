import React, { useEffect, useState } from "react";
import { FaSun, FaMoon, FaToggleOff, FaToggleOn } from "react-icons/fa";

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
        <h1 className="text-2xl font-bold flex-1 max-h-1">Settlers of Catan</h1>
        <span className="flex-3">
          <button
            onClick={toggleTheme}
            className="mb-4 px-4 py-2 bg-primary text-background rounded"
          >
              {theme === "light" ? (
                <div className="flex row-auto">
                  <FaMoon size={24} />
                  <FaToggleOff size={24} />
                </div>
              ) : (
                <div className="flex row-auto content-between">
                  {" "}
                   <FaSun size={24} />
                  <FaToggleOn size={24} />
                   {" "}
                </div>
              )}
          </button>
        </span>
      </div>
    </header>
  );
};

export default Header;
