import React from "react";
import { Link } from "react-router-dom";
import MovieSkeleton from "./MovieSkeleton";
import "./MoviesList.css";
import MoviesListGenre from "./MoviesListGenre";

const MoviesList = ({ listItems, text, home, genres, loading, searchMade, movies }) => {
  return (
    <div className="moviesList">
      <div className="container moviesList__container">
        <div className="row moviesList__row">
          {!searchMade && (
            <div
              className="moviesList__top"
              style={{ flexDirection: !home && "column" }}
            >
              <h1>{text}</h1>
              {home && (
                <Link to={movies ? '/movies' : '/tv'}>
                  <button className="moviesList__button pointer">
                    View all
                  </button>
                </Link>
              )}
              {genres && (
                <div className="moviesList__genres">
                  {genres?.map((movieGenre) => (
                    <MoviesListGenre genre={movieGenre.name} />
                  ))}
                </div>
              )}
            </div>
          )}
          {<div className="moviesList__list">
            {!loading
              ? ( listItems ) 
              : new Array(20)
                  .fill(0)
                  .map((_, index) => <MovieSkeleton key={index} />)}
          </div>}
          {home && (
            <Link className="moviesList__link" to={movies ? '/movies' : '/tv'}>
              <button className="moviesList__button moviesList__button2 pointer">
                View all
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
