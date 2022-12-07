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

const DetailsPage = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    getRecommendedMovies();
  }, []);

  async function getRecommendedMovies() {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/436270/recommendations?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1"
    );

    const data = res.data.results.slice(0, 4);

    setRecommendedMovies(data);
  }

  return (
    <div className="detailsPage">
      <div className="detailsPage__container container">
        <div className="detailsPage__row row">
          <Nav />
          <div className="detailsPage__movie">
            <div className="detailsPage__movie--content">
              <figure className="detailsPage__movie--img">
                <img
                  src="https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"
                  alt=""
                />
              </figure>
              <div className="detailsPage__movie--text">
                <h1>Movie Title</h1>
                <div className="detailsPage__movie--details">
                  <p className="detailsPage__movie--language">EN</p>
                  <p className="detailsPage__movie--genres">
                    Fantasy, Action, Adventure
                  </p>
                  <div className="detailsPage__movie--year">
                    <CalendarMonthIcon />
                    <p>2022</p>
                  </div>
                  <div className="detailsPage__movie--runtime">
                    <AccessTimeIcon />
                    <p>127m</p>
                  </div>
                </div>
                <div className="detailsPage__movie--actors">
                  <h4>Starring:</h4>
                  <p>
                    Dwayne Johnson, Noah Centineo, Robert Downy Jr, Bruce Wayne
                  </p>
                </div>
                <div className="detailsPage__movie--overview">
                  <h4>Overview:</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci ad inventore, ut voluptates cum eveniet distinctio
                    quia eaque natus exercitationem alias recusandae sunt
                    tenetur. Laudantium sint sed possimus! Voluptatibus,
                    molestias.
                  </p>
                </div>
                <div className="detailsPage__movie--bottom">
                  <div className="detailsPage__movie--rating">
                    <h4>User Rating:</h4>
                    <p>7.5 / 10</p>
                  </div>
                  <div className="detailsPage__movie--companies">
                    <h4>Producers:</h4>
                    <p>
                      DC Films, New Line Cinema, Flynn Picture Company, Seven
                      Bucks Productions
                    </p>
                  </div>
                </div>
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
                title={movie.name || movie.original_name || movie.title || movie.original_title}
                poster={movie.poster_path}
                id={movie.id}
                key={movie.id}
                year={movie.first_air_date?.slice(0, 4) || movie.release_date?.slice(0,4)}
                movie={true}
              />
            ))}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
