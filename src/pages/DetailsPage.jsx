import React, { useState } from "react";
import "./DetailsPage.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Nav from "../components/Nav";
import { Button } from "@mui/material";
import MoviesList from "../components/MoviesList";
import axios from "axios";
import { useEffect } from "react";
import Movie from "../components/Movie";
import { useParams } from "react-router-dom";
import NoImage from "../assets/NoImage.png";

const DetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    Promise.all([
      getMovieDetails(),
      getRecommendedMovies(),
      getMovieCast(),
    ]).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, [movieId]);

  async function getMovieDetails() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
    );

    setMovieDetails(res.data);
  }

  async function getMovieCast() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
    );

    const cast = res.data.cast
      .slice(0, 4)
      .map((actor) => actor.name)
      .join(", ");

    setMovieCast(cast);
  }

  async function getRecommendedMovies() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1`
    );

    let data;
    let res2;

    if (res.data.results.length === 0) {
      console.log("using similar instead");
      res2 = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1`
      );
      data = res2.data.results.slice(0, 4);
      return setRecommendedMovies(data);
    }

    data = res.data.results.slice(0, 4);

    setRecommendedMovies(data);
  }

  return (
    <div className="detailsPage">
      <div className="detailsPage__row row">
        <Nav />
        <div
          className="detailsPage__movie"
          style={{
            backgroundImage:
              movieDetails?.backdrop_path &&
              `url("https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}")`,
          }}
        >
          <div className="detailsPage__movie--content">
            <figure className="detailsPage__movie--img">
              <img
                src={
                  movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`
                    : NoImage
                }
                alt=""
              />
            </figure>
            <div className="detailsPage__movie--text">
              <h1>{movieDetails?.title || movieDetails.original_title}</h1>
              <div className="detailsPage__movie--details">
                <p className="detailsPage__movie--language">
                  {movieDetails?.original_language}
                </p>
                <p className="detailsPage__movie--genres">
                  {movieDetails?.genres?.map((genre) => genre.name).join(", ")}
                </p>
                <div className="detailsPage__movie--year">
                  <CalendarMonthIcon />
                  <p>{movieDetails?.release_date?.slice(0, 4)}</p>
                </div>
                <div className="detailsPage__movie--runtime">
                  <AccessTimeIcon />
                  <p>{movieDetails?.runtime}m</p>
                </div>
              </div>
              {movieCast && (
                <div className="detailsPage__movie--actors">
                  <h4>Starring:</h4>
                  <p>{movieCast}</p>
                </div>
              )}
              {movieDetails?.overview && (
                <div className="detailsPage__movie--overview">
                  <h4>Overview:</h4>
                  <p>{movieDetails?.overview}</p>
                </div>
              )}
              {(movieDetails?.vote_average ||
                movieDetails?.production_companies?.length > 0) && (
                <div className="detailsPage__movie--bottom">
                  {movieDetails?.vote_average && (
                    <div className="detailsPage__movie--rating">
                      <h4>User Rating:</h4>
                      <p>
                        {
                          // Rounding to 1 decimal place
                          Math.round(movieDetails?.vote_average * 10) / 10
                        }{" "}
                        / 10
                      </p>
                    </div>
                  )}
                  {movieDetails?.production_companies?.length >= 1 && (
                    <div className="detailsPage__movie--producers">
                      <h4>Producers:</h4>
                      <p>
                        {movieDetails?.production_companies
                          ?.map((producer) => producer.name)
                          .join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              )}
              <button className="detailsPage__movie--button pointer">
                Add to favourites
              </button>
            </div>
          </div>
        </div>

        <MoviesList
          text={"Recommended Movies"}
          listItems={recommendedMovies.map((movie) => (
            <Movie
              title={
                movie.name ||
                movie.original_name ||
                movie.title ||
                movie.original_title
              }
              poster={movie.poster_path}
              id={movie.id}
              key={movie.id}
              year={
                movie.first_air_date?.slice(0, 4) ||
                movie.release_date?.slice(0, 4)
              }
              movie={true}
            />
          ))}
          loading={loading}
          amountOfMovies={4}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
