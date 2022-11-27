import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import SearchIcon from '@mui/icons-material/Search';

const Nav = () => {
  return (
    <nav>
      <div className="nav__left">
        <p className="nav__logo">
          Ticket<span className="textcolor nav__plus">+</span>
        </p>
        <div className="nav__links">
          <Link to="/">Home</Link>
          <Link to="/">Movies</Link>
          <Link to="/">TV Shows</Link>
          <Link to="/">Favourites</Link>
        </div>
      </div>
      <div className="nav__right">
        <form action="">
          <div className="nav__input--wrapper">
            <input type="text" placeholder="Search..."/>
            <button className='pointer' type="submit"><SearchIcon /></button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
