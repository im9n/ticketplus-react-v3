import React from 'react';
import './Movie.css'
import './Skeleton.css'

const MovieSkeleton = () => {
    return (
        <figure className="movie">
       <div className='skeleton movie__skeleton'></div>
        </figure>
    );
}

export default MovieSkeleton;
