import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
// import GameDetail from "./components/GameDetail";
import Sidebar from "./components/Sidebar";
import { GameHistory } from "./components/GameHistory";
import { Statistics } from "./components/Statistics";

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Header />
      <div className="container mx-auto px-4 pt-10 min-w-64">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/statistics" Component={Statistics} />
          <Route path="/game-history" Component={GameHistory} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
