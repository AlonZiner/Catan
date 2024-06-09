import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// import Footer from './components/Footer';
import HomePage from "./components/HomePage";
import GameDetail from "./components/GameDetail";
// import AddGame from './components/AddGame';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto px-4 pt-10 min-w-64">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/game/:id" Component={GameDetail} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
