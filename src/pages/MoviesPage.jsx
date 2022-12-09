import Pagination from "../components/Pagination";
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
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(500);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("featured");
  const [searchMade, setSearchMade] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPopularMovies(), getMovieGenres()]).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, [pageNumber, search, filter, selectedGenres]);

  async function getPopularMovies() {
    const res = await axios.get(
      searchMade
        ? `https://api.themoviedb.org/3/search/movie?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&query=${search}&page=${pageNumber}&include_adult=false`
        : selectedGenres?.length > 0
        ? `https://api.themoviedb.org/3/discover/movie?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&sort_by=popularity.desc&include_adult=false&page=${pageNumber}&with_genres=${selectedGenres.join(
            "%2C"
          )}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=${pageNumber}`
    );

    let movies;

    if (filter === "featured") {
      movies = res.data.results;
    }
    if (filter === "newest") {
      movies = res.data.results.sort(
        (a, b) =>
          parseInt(b.release_date?.slice(0, 5)) -
          parseInt(a.release_date?.slice(0, 5))
      );
    }
    if (filter === "oldest") {
      movies = res.data.results.sort(
        (a, b) =>
          parseInt(a.release_date?.slice(0, 5)) -
          parseInt(b.release_date?.slice(0, 5))
      );
    }
    if (filter === "rating") {
      movies = res.data.results.sort((a, b) => b.vote_average - a.vote_average);
    }

    const movieTotalPages = res.data.total_pages;

    setMoviesData(movies);
    if(selectedGenres.length > 0){
      setPageNumber(1)
    }
    if (searchMade || selectedGenres.length > 0) {
      setTotalPages(movieTotalPages < 500 ? movieTotalPages : 500);
    }
  }

  async function getMovieGenres() {
    const res = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US"
    );

    const data = res.data.genres;

    setMovieGenres(data);
  }

  return (
    <div className="moviesPage">
      <div className="moviesPage--top">
        <Nav />
        <Search
          setFilter={setFilter}
          filter={filter}
          setSearch={setSearch}
          searchMade={searchMade}
          search={search}
          setSearchMade={setSearchMade}
          setPageNumber={setPageNumber}
        />
      </div>
      <MoviesList
        text={"Popular Movies"}
        home={false}
        genres={movieGenres}
        listItems={
          <>
            {moviesData.length > 0 ? (
              moviesData?.map((movie) => (
                <Movie
                  title={movie.title || movie.original_title}
                  poster={movie.poster_path}
                  id={movie.id}
                  key={movie.id}
                  year={movie.release_date?.slice(0, 4)}
                  movie={true}
                />
              ))
            ) : (
              <div className="moviesPage__results">
                <h2 style={{ height: "90vh", fontWeight: "300" }}>
                  Sorry, we couldn't find any matching results for your search.
                </h2>
              </div>
            )}
          </>
        }
        loading={loading}
        key={3}
        searchMade={searchMade}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        amountOfMovies={20}
      />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MoviesPage;
