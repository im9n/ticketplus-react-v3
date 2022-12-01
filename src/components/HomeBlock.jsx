import React from "react";
import "./HomeBlock.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";

const HomeBlock = ({
  title,
  backDrop,
  likes,
  year,
  language,
  genres,
  overview,
  availableGenres,
}) => {
  const movieGenres = []

  {for (let i = 0; index < genres.length; i++) {
                           
  }}

  console.log(movieGenres)

  return (
    <div
      className="homeBlock"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${backDrop}")`,
      }}
    >
      <div className="homeBlock__container">
        <div className="homeBlock__content">
          <h4>Latest Hits</h4>
          <h1>{title}</h1>
          <div className="homeBlock__details">
            <div className="homeBlock__detail">
              <ThumbUpIcon />
              <p>{likes}</p>
            </div>
            <div className="homeBlock__detail homeBlock__year">
              <p>{year}</p>
            </div>
            <div className="homeBlock__detail homeBlock__language">
              <p>{language}</p>
            </div>
            <div className="homeBlock__detail homeBlock__genre">
            </div>
          </div>
          <p>{overview}</p>
          <Link to="/">
            <button className="homeBlock__button pointer">Discover</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBlock;
