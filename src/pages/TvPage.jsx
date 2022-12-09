import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import MoviesList from "../components/MoviesList";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import "./TvPage.css";

const TvPage = () => {
  const [tvData, setTvData] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchMade, setSearchMade] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("featured");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(500);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTvGenres();
  }, []);

  useEffect(() => {
    getTvShows().then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, [search, filter, selectedGenres, pageNumber]);

  async function getTvGenres() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
    );

    const data = res.data.genres;

    setTvGenres(data);
  }

  async function getTvShows() {
    setLoading(true);

    const res = await axios.get(
      searchMade
        ? `https://api.themoviedb.org/3/search/tv?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=${pageNumber}&query=${search}&include_adult=false`
        : selectedGenres.length > 0
        ? `https://api.themoviedb.org/3/discover/tv?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&sort_by=popularity.desc&page=${pageNumber}&with_genres=${selectedGenres.join(
            "%2C"
          )}&include_null_first_air_dates=false`
        : `https://api.themoviedb.org/3/tv/popular?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=${pageNumber}`
    );

    let data;

    if (filter === "featured") {
      data = res.data.results;
    }
    if (filter === "newest") {
      data = res.data.results.sort(
        (a, b) =>
          parseInt(b.first_air_date?.slice(0, 5)) -
          parseInt(a.first_air_date?.slice(0, 5))
      );
    }
    if (filter === "oldest") {
      data = res.data.results.sort(
        (a, b) =>
          parseInt(a.first_air_date?.slice(0, 5)) -
          parseInt(b.first_air_date?.slice(0, 5))
      );
    }
    if (filter === "rating") {
      data = res.data.results.sort((a, b) => b.vote_average - a.vote_average);
    }

    setTvData(data);

    const movieTotalPages = res.data.total_pages;

    if(selectedGenres.length > 0){
      setPageNumber(1)
    }
    if (searchMade || selectedGenres.length > 0) {
      setTotalPages(movieTotalPages < 500 ? movieTotalPages : 500);
    }
  }

  return (
    <div className="tvPage">
      <div className="tvPage__top">
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
        text="Popular TV Shows"
        genres={tvGenres}
        loading={loading}
        listItems={
          <>
            {tvData.length > 0 ? (
              tvData?.map((movie) => (
                <Movie
                  title={movie.name || movie.original_name}
                  poster={movie.poster_path}
                  id={movie.id}
                  key={movie.id}
                  year={movie.first_air_date?.slice(0, 4)}
                  movie={false}
                />
              ))
            ) : (
              <div className="tvPage__results">
                <h2 style={{ height: "90vh", fontWeight: "300" }}>
                  Sorry, we couldn't find any matching results for your search.
                </h2>
              </div>
            )}
          </>
        }
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

export default TvPage;
