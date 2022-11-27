import React from "react";
import "./Movie.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PublicIcon from "@mui/icons-material/Public";

const Movie = () => {
  return (
    <div className="movie pointer">
      <figure className="movie__img">
        <img
          src="https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"
          alt=""
        />
      </figure>
      <div className="movie__content">
        <div className="movie__top">
          <h4>Black Adam</h4>
          <div className="movie__genres">
            <p>Fantasy</p>
            <p>Science Fiction</p>
            <p>Animation</p>
          </div>
        </div>
        <div className="movie__details">
          <div className="movie__detail">
            <ThumbUpIcon />
            <p>7.2</p>
          </div>
          <div className="movie__detail">
            <CalendarMonthIcon />
            <p>2021</p>
          </div>
          <div className="movie__detail movie__language">
            <PublicIcon />
            <p>en</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
