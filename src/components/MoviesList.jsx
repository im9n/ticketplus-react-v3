import React from "react";
import { Link } from "react-router-dom";
import "./MoviesList.css";
import MoviesListGenre from "./MoviesListGenre";

const MoviesList = ({ listItems, text, home, genres }) => {
  return (
    <div className="moviesList">
      <div className="container moviesList__container">
        <div className="row moviesList__row">
          <div
            className="moviesList__top"
            style={{ flexDirection: !home && "column" }}
          >
            <h1>{text}</h1>
            {home && (
              <Link>
                <button className="moviesList__button pointer">View all</button>
              </Link>
            )}
            {genres && (
              <div className="moviesList__genres">
                {genres.map((movieGenre) => (
                  <MoviesListGenre genre={movieGenre.name} />
                ))}
              </div>
            )}
          </div>
          <div className="moviesList__list">{listItems}</div>
          {home && (
            <Link className="moviesList__link">
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
