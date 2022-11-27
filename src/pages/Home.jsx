import React from "react";
import HomeBlock from "../components/HomeBlock";
import "./Home.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
import MoviesList from "../components/MoviesList";

const Home = () => {
  const settings = {
    items: 1,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplaySpeed: 1200,
    smartSpeed: 500,
  };

  return (
    <div className="home">
      <Nav />
      <OwlCarousel className="owl-theme" {...settings}>
        <HomeBlock />
        <HomeBlock />
        <HomeBlock />
      </OwlCarousel>
      <MoviesList
        listItems={
          <>
            <Movie />
            <Movie />
            <Movie />
            <Movie />
          </>
        }

        text="Popular Movies"
      />
      <div className="home__movies">
        <div className="container home__movies--container">
          <div className="row home__movies--row">
            <div className="home__movies--top">
              <h1>Popular TV Shows</h1>
              <Link>
                <button className="home__movies--button pointer">
                  View all
                </button>
              </Link>
            </div>
            <div className="home__movies--list">
              <Movie />
              <Movie />
              <Movie />
              <Movie />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
