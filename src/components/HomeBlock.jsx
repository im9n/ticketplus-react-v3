import React, { useEffect, useState } from "react";
import "./HomeBlock.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';

const HomeBlock = ({
  title,
  backDrop,
  likes,
  year,
  language,
  overview,
  id
}) => {
  const [loading, setLoading] = useState(true);
  const [movieGenres, setMovieGenres] = useState([]);

  useEffect(() => {
    getGenres();
  }, []);

  async function getGenres() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US`
    );

    const data = res.data.genres

    setMovieGenres(data);

    setLoading(false);
  }

  return (
    <div
      className="homeBlock"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${backDrop}")`,
      }}
      key={id}
    >
      <div className="homeBlock__container">
        <div className="homeBlock__content">
          <h4>Latest Hits</h4>
          <h1>{title}</h1>
          <div className="homeBlock__details">
            <div className="homeBlock__detail homeBlock__likes">
              <StarIcon />
              <p className="homeBlock__likes--text">{likes}</p>
              <p> | 10</p>
            </div>
            
            <div className="homeBlock__detail homeBlock__year">
              <p>{year}</p>
            </div>
            <p className="homeBlock__seperator">.</p>
            <div className="homeBlock__detail homeBlock__language">
              <p>{language}</p>
            </div>
            <p className="homeBlock__seperator">.</p>
            <p className="homeBlock__detail homeBlock__genre">
              {movieGenres?.map(genre => (genre.name)).join(', ')}
            </p>
          </div>
          <p>{overview}</p>
          <Link to={`/movie/${id}`}>
            <button className="homeBlock__button pointer">Discover</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBlock;
