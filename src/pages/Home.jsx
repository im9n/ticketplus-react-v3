import React, { useEffect, useState } from "react";
import HomeBlock from "../components/HomeBlock";
import "./Home.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
import MoviesList from "../components/MoviesList";
import axios from "axios";
import "../components/Skeleton.css";

const Home = ({ availableGenres }) => {
  const settings = {
    items: 1,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 15000,
    autoplaySpeed: 1200,
    smartSpeed: 500,
  };
  const [loading, setLoading] = useState(true);
  const [moviesData, setMoviesData] = useState([]);
  const [showsData, setShowsData] = useState([]);

  async function getPopularMovies() {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1"
    );

    const movies = res.data.results.slice(0, 17);

    setMoviesData(movies);
  }

  async function getPopularShows() {
    const res = await axios.get(
      "https://api.themoviedb.org/3/tv/popular?api_key=04bf768048c1a3faae7a9805b4bb26a6&language=en-US&page=1"
    );

    const shows = res.data.results.slice(0, 12);

    setShowsData(shows);
  }

  useEffect(() => {
    Promise.all([getPopularMovies(), getPopularShows()]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="home">
      <Nav />
      {loading ? (
        <div className="carousel__skeleton skeleton"></div>
      ) : (
        <OwlCarousel className="owl-theme" {...settings}>
          {moviesData?.slice(0, 5).map((movie) => (
            <HomeBlock
              title={movie.title || movie.original_title}
              backDrop={movie.backdrop_path}
              likes={movie.vote_average}
              year={movie.release_date.slice(0, 4)}
              language={movie.original_language}
              overview={movie.overview}
              id={movie.id}
              key={movie.id}
              movie={true}
            />
          ))}
        </OwlCarousel>
      )}
      <MoviesList
        listItems={
          <>
            {moviesData?.slice(5, 17).map((movie) => (
              <Movie
                title={movie.title || movie.original_title}
                poster={movie.poster_path}
                id={movie.id}
                key={movie.id}
                year={movie.release_date.slice(0, 4)}
                movie={true}
              />
            ))}
          </>
        }
        text="Popular Movies"
        home={true}
        movies={true}
        loading={loading}
        key={1}
        amountOfMovies={12}
      />
      <MoviesList
        listItems={
          <>
            <>
              {showsData?.map((movie) => (
                <Movie
                  title={movie.name || movie.original_name}
                  poster={movie.poster_path}
                  id={movie.id}
                  key={movie.id}
                  year={movie.first_air_date.slice(0, 4)}
                  movie={false}
                />
              ))}
            </>
          </>
        }
        loading={loading}
        text="Popular TV Shows"
        home={true}
        movies={false}
        key={2}
        amountOfMovies={12}
      />
    </div>
  );
};

export default Home;
