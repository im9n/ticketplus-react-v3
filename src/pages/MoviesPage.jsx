import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import MoviesList from "../components/MoviesList";
import Nav from "../components/Nav";
import Search from "../components/Search";
import "./MoviesPage.css";

const MoviesPage = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPopularMovies(), getMovieGenres()]);
  }, []);

  async function getPopularMovies() {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1"
    );

    const movies = res.data.results;

    setMoviesData(movies);

    setLoading(false);
  }

  async function getMovieGenres() {
    const res = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US"
    );

    const data = res.data.genres
    
    setMovieGenres(data)
  }

  return (
    <div className="moviesPage">
      <div className="moviesPage--top">
        <Nav />
        <Search />
      </div>
      <MoviesList
        text={"Popular Movies"}
        home={false}
        genres={movieGenres}
        listItems={
          <>
            {moviesData?.map((movie) => (
              <Movie
                title={movie.original_title}
                poster={movie.poster_path}
                id={movie.id}
                key={movie.id}
                movie={true}
              />
            ))}
          </>
        }
      />
    </div>
  );
};

export default MoviesPage;
