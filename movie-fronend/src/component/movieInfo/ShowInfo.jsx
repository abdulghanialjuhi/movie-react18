import React, { useContext } from "react";
import WatchlistBtn from "./WatchlistBtn";
import Context from "../../context/Context";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function MovieInfo({
  overview,
  poster_path,
  title,
  vote_average,
  spoken_languages,
  release_date,
  items,
  genres,
}) {

  const { watchlist } = useContext(Context)

  const genresName = genres.slice(0, 3);

  return (
    <div className="overview_information">
      <div className="poster-container">
        <img className="sidebar" src={IMAGE_URL + poster_path} alt={title} />
      </div>
      <div  className="overview-containor">
        <h3 className="title">{title}</h3>
        <ul className="information">
          <li className="li imdb fab">
            <h5 style={{ color: "#f3ce13", marginRight: 6 }}>IMDB Rating:</h5>
            {vote_average}
          </li>
          <li className="li imdb">
            <h5 style={{ margin: 0, marginRight: 6 }}> Language: </h5>

            {spoken_languages[0]
              ? spoken_languages[0].english_name
              : "undefind"}
          </li>
          <li className="li imdb">
            <h5 style={{ margin: 0, marginRight: 6 }}> Year: </h5>
            {release_date.slice(0, -6)}
          </li>
        </ul>
        <div className="genres">
          <h5 style={{ color: "#e5e5e5" }}>Genres:</h5>
          <ul className="ul-genres">
            {genresName.map((genreName) => (
              <li className="li-genres" key={genreName.id}>
                {genreName.name}
              </li>
            ))}
          </ul>
        </div>
        <WatchlistBtn items={items} watchlist={watchlist}  />
        <p> {overview} </p>
      </div>
    </div>
  );
}
