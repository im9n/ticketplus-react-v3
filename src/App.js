import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  const [availableGenres, setAvailableGenres] = useState([]);

  useEffect(() => {
    setGenres();
  }, []);

  async function setGenres() {
    const res = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US"
    );

    const genres = res.data.genres

setAvailableGenres(genres)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home availableGenres={availableGenres}/>} />
      </Routes>
    </Router>
  );
}

export default App;
