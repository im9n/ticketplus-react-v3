import React from "react";
import "./HomeBlock.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";

const HomeBlock = () => {
  return (
    <div className="homeBlock">
      <div className="homeBlock__container">
        <div className="homeBlock__content">
          <h4>Latest Hits</h4>
          <h1>Movie Title</h1>
          <div className="homeBlock__details">
            <div className="homeBlock__detail">
              <ThumbUpIcon />
              <p>7.5</p>
            </div>
            <div className="homeBlock__detail homeBlock__year">
              <CalendarMonthIcon />
              <p>2022</p>
            </div>
            <div className="homeBlock__detail homeBlock__language">
              <p>EN</p>
            </div>
            <div className="homeBlock__detail homeBlock__genre">
              <p>Fantasy, Action, Adventure</p>
            </div>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
            veniam corrupti illo qui possimus animi quas fuga recusandae,
            maiores quisquam nihil praesentium exercitationem amet? Non animi
            corrupti numquam debitis esse?
          </p>
          <Link to="/">
            <button className="homeBlock__button pointer">Discover</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBlock;
