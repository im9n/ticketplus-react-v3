import React from "react";
import "./Movie.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PublicIcon from "@mui/icons-material/Public";

const Movie = ({title, poster, genres, id}) => {

  return (
      <figure className="movie pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt=""
        />
              <div className="movie__content">
        <div className="movie__top">
          <h4>{title}</h4>
          <div className="movie__genres">
            <p>Fantasy</p>
            <p>Science Fiction</p>
            <p>Animation</p>
          </div>
        </div>
      </div>
      </figure>
  );
};

export default Movie;
