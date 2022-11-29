import React from 'react';
import { Link } from 'react-router-dom';
import './MoviesList.css'

const MoviesList = ({listItems, text}) => {
    return (
    <div className="moviesList">
        <div className="container moviesList__container">
          <div className="row moviesList__row">
            <div className="moviesList__top">
              <h1>{text}</h1>
              <Link>
                <button className="moviesList__button pointer">View all</button>
              </Link>
            </div>
            <div className="moviesList__list">
             {listItems}
            </div>
            <Link className='moviesList__link'>
                <button className="moviesList__button moviesList__button2 pointer">View all</button>
              </Link>
          </div>
        </div>
      </div>
    );
}

export default MoviesList;
