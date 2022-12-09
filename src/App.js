import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import DetailsPage from "./pages/DetailsPage";
import Home from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";
import TvPage from "./pages/TvPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/movie/:movieId" element={<DetailsPage movie={true}/>} />
        <Route path="/tv/:movieId" element={<DetailsPage movie={false}/>} />
      </Routes>
    </Router>
  );
}

export default App;
