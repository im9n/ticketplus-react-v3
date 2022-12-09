import React, { useEffect, useState } from "react";
import "./Movie.css";
import NoImage from "../assets/NoImage.png";
import axios from "axios";
import "./Skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import MovieSkeleton from "./MovieSkeleton";

const Movie = ({ title, poster, id, movie, year }) => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getGenres();
  }, []);

  async function getGenres() {
    const res = movie
      ? await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
        )
      : await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
        );

    const data = res.data.genres;

    setMovieGenres(data);

    setLoading(false);
  }

  return !loading ? (
    <figure
      className="movie pointer"
      key={id}
      onClick={movie ? () => navigate(`/movie/${id}`) : () => navigate(`/tv/${id}`)}
    >
      {poster ? (
        <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="" />
      ) : (
        <img src={NoImage} />
      )}
      <div className="movie__content">
        <div className="movie__top">
          <h4>{title}</h4>
          <div className="movie__genres">
            {movieGenres?.map((genre) => (
              <p>{genre.name}</p>
            ))}
          </div>
        </div>
      </div>
      {year && <p className="movie__year">{year}</p>}
    </figure>
  ) : (
    <MovieSkeleton />
  );
};

export default Movie;
