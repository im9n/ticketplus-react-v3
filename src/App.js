import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
