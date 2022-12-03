import React, { useEffect, useState } from "react";
import "./Movie.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PublicIcon from "@mui/icons-material/Public";
import axios from "axios";

const Movie = ({ title, poster, id, movie }) => {
  const [movieGenres, setMovieGenres] = useState([]);

  useEffect(() => {
    getGenres();
  }, []);

  async function getGenres() {
    const res = movie ?  await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`) : await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`)

    const data = res.data.genres;

    setMovieGenres(data);
  }

  return (
    <figure className="movie pointer" key={id}>
      <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="" />
      <div className="movie__content">
        <div className="movie__top">
          <h4>{title}</h4>
          <div className="movie__genres">
            {movieGenres.map((genre) => (
              <p>{genre.name}</p>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
};

export default Movie;
