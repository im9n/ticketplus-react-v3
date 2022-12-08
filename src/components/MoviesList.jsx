import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieSkeleton from "./MovieSkeleton";
import "./MoviesList.css";
import MoviesListGenre from "./MoviesListGenre";
import "./MoviesListGenre.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FlashOffOutlined, KeyboardArrowUp } from "@mui/icons-material";

const MoviesList = ({
  listItems,
  text,
  home,
  genres,
  loading,
  searchMade,
  movies,
  setSelectedGenres,
  selectedGenres,
  amountOfMovies
}) => {
  const [seeMore, setSeeMore] = useState(false);

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
                <Link to={movies ? "/movies" : "/tv"}>
                  <button className="moviesList__button pointer">
                    View all
                  </button>
                </Link>
              )}
              {genres && (
                <>
                  <div className="moviesList__genres moviesList__genres1">
                    {genres?.map((movieGenre) => (
                      <MoviesListGenre
                        genre={movieGenre.name}
                        id={movieGenre.id}
                        key={movieGenre.id}
                        setSelectedGenres={setSelectedGenres}
                        selectedGenres={selectedGenres}
                      />
                    ))}
                  </div>

                  <div className="moviesList__genres moviesList__genres2">
                    {genres?.map((movieGenre, index) => (
                      <MoviesListGenre
                        genre={movieGenre.name}
                        id={movieGenre.id}
                        key={movieGenre.id}
                        setSelectedGenres={setSelectedGenres}
                        selectedGenres={selectedGenres}
                        index={index}
                        seeMore={seeMore}
                      />
                    ))}
                    {!seeMore ? (
                      <p
                        className="moviesList__seeMore pointer"
                        onClick={() => setSeeMore(true)}
                      >
                        See More <KeyboardArrowDownIcon />
                      </p>
                    ) : (
                      <p
                        className="moviesList__seeLess pointer"
                        onClick={() => setSeeMore(false)}
                      >
                        See Less <KeyboardArrowUp />
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          {
            <div className="moviesList__list">
              {!loading
                ? listItems
                : new Array(amountOfMovies)
                    .fill(0)
                    .map((_, index) => <MovieSkeleton key={index} />)}
            </div>
          }
          {home && (
            <Link className="moviesList__link" to={movies ? "/movies" : "/tv"}>
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
