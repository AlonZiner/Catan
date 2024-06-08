import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="bg-primary text-background p-4">
      <h1 className="text-2xl font-bold">Settlers of Catan Game History</h1>
      <button
        onClick={toggleTheme}
        className="mb-4 px-4 py-2 bg-primary text-background rounded"
      >
        Toggle Theme
      </button>
    </header>
  );
};

export default Header;
