import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import DisplayMovies from "../../pages/DisplayMovies";

const search_api =
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=`;

const SearchUrl = () =>  {

  const {name} = useParams()

  const [movies, setMovies] = useState([])
  const [isload, setIsload] = useState(true)


  useEffect(() => {
    fetch(search_api + name)
    .then((res) => res.json())
    .then((data) => {
      if (data.total_pages > 0) {
        data = data.results
        setMovies(data)
        setIsload(true)
      } else {
        setIsload(false)
      }
    });
    // eslint-disable-next-line
  }, [])

    if (isload) {
      return (
        <div className="movie-containor">
          {movies.map((movie) => (
            <DisplayMovies {...movie} key={movie.id} />
          ))}
        </div>
      );
    } else {
      return <h1 className="not-found"> Movie Not Found </h1>;
    }
}

export default SearchUrl;
