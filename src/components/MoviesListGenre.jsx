import React, { useState } from "react";
import "./MoviesListGenre.css";

const MoviesListGenre = ({ genre }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <p
        className="pointer moviesList__genre"
        style={{
          backgroundColor: clicked && "#2560e9",
          color: clicked && "white",
        }}
        onClick={() => setClicked(!clicked)}
      >
        {genre}
      </p>
    </div>
  );
};

export default MoviesListGenre;
