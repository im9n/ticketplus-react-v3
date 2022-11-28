import React from "react";
import "./Movie.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PublicIcon from "@mui/icons-material/Public";

const Movie = () => {
  return (
      <figure className="movie pointer">
        <img
          src="https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"
          alt=""
        />
              <div className="movie__content">
        <div className="movie__top">
          <h4>R.I.P.D 2: Rise of the Damned</h4>
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
