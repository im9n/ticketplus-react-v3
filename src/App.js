import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
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
      </Routes>
    </Router>
  );
}

export default App;
