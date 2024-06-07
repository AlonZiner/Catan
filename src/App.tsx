import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// import Footer from './components/Footer';
import HomePage from "./components/HomePage";
import GameDetail from "./components/GameDetail";
// import AddGame from './components/AddGame';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/game/:id" Component={GameDetail} />
          {/* <Route path="/add-game" Component={AddGame} /> */}
          {/* <Footer /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
