import React from "react";
import { Link } from "react-router-dom";
import Getgener from "../movieInfo/Getgener";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

const DisplayMovies = ({ poster_path, title, vote_average, id, release_date }) => {
  return (
        <div className="movie">
          <Link to={`/movie/${id}`}>
            <img
              src={
                poster_path
                  ? IMAGE_URL + poster_path
                  : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
              }
              alt={title}
            />
          </Link>
          <div className="movie-info">
            <div className="titleContainor">
              <h3>{title}</h3>
            </div>
            <div className="voteContainor">
              <span className={getClassByRate(vote_average)}>
                {vote_average}
              </span>
            </div>
          </div>
          <div className="overview">
            <Getgener id={id} class="overview-genres" />
            <hr />
            <h5> {release_date} </h5>
          </div>
        </div>
  );
};

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

export default DisplayMovies;
