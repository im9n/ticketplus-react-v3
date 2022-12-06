import React, { useState } from "react";
import "./MoviesListGenre.css";

const MoviesListGenre = ({ genre, id, setSelectedGenres, selectedGenres, index, seeMore }) => {
  const [clicked, setClicked] = useState(false);

  function addGenre() {
    setClicked(true);

    setSelectedGenres([...selectedGenres, id]);

    console.log(selectedGenres.toString());
  }

  function removeGenre() {
    setClicked(false);

    setSelectedGenres(
      selectedGenres.filter(movieGenre => movieGenre !== id)
    );

    console.log(selectedGenres.toString())
  }

  return (
    <p
      className="pointer moviesList__genre"
      style={{
        backgroundColor: clicked && "#2560e9",
        color: clicked && "white",
        display: !seeMore && index > 0 && 'none'
      }}
      onClick={!clicked ? () => addGenre() : () => removeGenre()}
    >
      {genre}
    </p>
  );
};

export default MoviesListGenre;
