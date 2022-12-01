import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Nav = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const body = document.body

  function openModal(){
    setModalOpen(true)

    body.classList.add('modal-open')
    body.classList.remove('modal-close')
  }

  function closeModal(){
    setModalOpen(false)

   body.classList.remove('modal-open')
   body.classList.add('modal-close')
  }

  return (
    <>
      <nav>
        <div className="nav__left">
          <p className="nav__logo">
            Ticket<span className="textcolor nav__plus">+</span>
          </p>
        </div>
        <div className="nav__right">
          <div className="nav__links">
            <Link to="/">Home</Link>
            <Link to="/">Movies</Link>
            <Link to="/">TV Shows</Link>
            <Link to="/">Favourites</Link>
          </div>
          <MenuIcon className="pointer"  onClick={() => openModal()}/>
        </div>
      </nav>
      <div className={`modal ${modalOpen ? 'open' : 'close'}`}>
        <CloseIcon className="pointer" onClick={() => closeModal()}/>
        <div className="modal__links">
          <Link to="/">Home</Link>
          <Link to="/">Movies</Link>
          <Link to="/">TV Shows</Link>
          <Link to="/">Favourites</Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
