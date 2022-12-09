import React, { useState } from "react";
import "./DetailsPage.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Nav from "../components/Nav";
import MoviesList from "../components/MoviesList";
import axios from "axios";
import { useEffect } from "react";
import Movie from "../components/Movie";
import { useParams } from "react-router-dom";
import NoImage from "../assets/NoImage.png";
import "../components/Skeleton.css";

const DetailsPage = ({ movie }) => {
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
      movie
        ? `https://api.themoviedb.org/3/movie/${movieId}?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
        : `https://api.themoviedb.org/3/tv/${movieId}?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
    );

    setMovieDetails(res.data);

    console.log(res.data);
  }

  async function getMovieCast() {
    const res = await axios.get(
      movie
        ? `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
        : `https://api.themoviedb.org/3/tv/${movieId}/credits?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
    );

    const cast = res.data.cast
      .slice(0, 4)
      .map((actor) => actor.name)
      .join(", ");

    setMovieCast(cast);
  }

  async function getRecommendedMovies() {
    const res = await axios.get(
      movie
        ? `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1`
        : `https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1`
    );

    let data;
    let res2;

    if (res.data.results.length === 0) {
      console.log("using similar instead");
      res2 = await axios.get(
        movie
          ? `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1`
          : `https://api.themoviedb.org/3/tv/119051/similar?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1`
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
            backgroundImage: loading
              ? null
              : movieDetails?.backdrop_path &&
                `url("https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}")`,
          }}
        >
          <div className="detailsPage__movie--content">
            <figure className="detailsPage__movie--img">
              {loading ? (
                <div
                  className="skeleton"
                  style={{
                    width: "360px",
                    maxWidth: "100%",
                    aspectRatio: "2 / 3",
                  }}
                ></div>
              ) : (
                <img
                  src={
                    movieDetails.poster_path
                      ? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`
                      : NoImage
                  }
                  alt=""
                />
              )}
            </figure>
            <div className="detailsPage__movie--text">
              {loading ? (
                <div
                  className="skeleton"
                  style={{ width: "700px", height: "60px", maxWidth: "90%" }}
                ></div>
              ) : (
                <h1>
                  {movie
                    ? movieDetails?.title || movieDetails.original_title
                    : movieDetails?.name || movieDetails?.original_name}
                </h1>
              )}
              {loading ? (
                <div
                  className="skeleton"
                  style={{
                    width: "400px",
                    height: "32px",
                    maxWidth: "70%",
                    marginTop: "16px",
                  }}
                ></div>
              ) : (
                <div className="detailsPage__movie--details">
                  <p className="detailsPage__movie--language">
                    {movieDetails?.original_language}
                  </p>
                  <p className="detailsPage__movie--genres">
                    {movieDetails?.genres
                      ?.map((genre) => genre.name)
                      .join(", ")}
                  </p>
                  <div className="detailsPage__movie--year">
                    <CalendarMonthIcon />
                    <p>
                      {movie
                        ? movieDetails?.release_date?.slice(0, 4)
                        : movieDetails?.first_air_date?.slice(0, 4)}
                    </p>
                  </div>
                  <div
                    className={`detailsPage__movie--${
                      movie ? "runtime" : "seasons"
                    }`}
                  >
                    {movie && <AccessTimeIcon />}
                    <p>
                      {movie
                        ? movieDetails?.runtime + "m"
                        : movieDetails?.number_of_seasons +
                          " " +
                          `Season${
                            movieDetails?.number_of_seasons > 1 ? "s" : ""
                          }`}
                    </p>
                  </div>
                </div>
              )}
              {loading ? (
                <>
                  <div
                    className="skeleton"
                    style={{
                      width: "600px",
                      height: "32px",
                      maxWidth: "90%",
                      marginTop: "32px",
                    }}
                  ></div>
                  <div
                    className="skeleton"
                    style={{
                      width: "600px",
                      height: "32px",
                      maxWidth: "90%",
                      marginTop: "12px",
                    }}
                  ></div>
                  <div
                    className="skeleton"
                    style={{
                      width: "400px",
                      height: "32px",
                      maxWidth: "90%",
                      marginTop: "12px",
                    }}
                  ></div>
                </>
              ) : (
                <>
                  {movieCast && (
                    <div className="detailsPage__movie--actors">
                      <h4>Starring:</h4>
                      <p>{movieCast}</p>
                    </div>
                  )}{" "}
                  {movieDetails?.overview && (
                    <div className="detailsPage__movie--overview">
                      <h4>Overview:</h4>
                      <p>{movieDetails?.overview}</p>
                    </div>
                  )}
                </>
              )}
              {(movieDetails?.vote_average ||
                movieDetails?.production_companies?.length > 0) && (
                <div className="detailsPage__movie--bottom">
                  {loading ? (
                    <div className="skeleton" style={{width: '700px', height: '32px', maxWidth: '90%', marginTop: '24px'}}></div>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              )}
              { loading ? <div className="skeleton" style={{width: '90%', height: '80px'}}></div> : <button className="detailsPage__movie--button pointer" onClick={() => alert('This feature is not yet implemented!')}>
               watch now
              </button> }
            </div>
          </div>
        </div>

        <MoviesList
          text={`Recommended ${movie ? "Movies" : "Shows"}`}
          listItems={recommendedMovies.map((recommendedMovie) => (
            <Movie
              title={
                recommendedMovie.name ||
                recommendedMovie.original_name ||
                recommendedMovie.title ||
                recommendedMovie.original_title
              }
              poster={recommendedMovie.poster_path}
              id={recommendedMovie.id}
              key={recommendedMovie.id}
              year={
                recommendedMovie.first_air_date?.slice(0, 4) ||
                recommendedMovie.release_date?.slice(0, 4)
              }
              movie={movie}
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
