import React, { useEffect, useState, useRef, useContext } from "react";
import DisplayMovies from "../pages/DisplayMovies";
import Context from "../../context/Context";
import Spinner from "../tools/Spinner";


function WatchList() {

  const [watchlistmovie, Setwatchlistmovie] = useState([]);
  const [isloaded, setIsloaded] = useState(false);
  const isMountedRef = useRef(false);
  const { watchlist, email, checkToken, movieInfo } = useContext(Context)

  const getMovies = (movies) => {

    let count = movies.length

     movies.forEach((movie) => {
        fetch(movieInfo(movie))
        .then((res) => res.json())
        .then((data) => {
          Setwatchlistmovie((prev) => [...prev, data])
          count -= 1
          if (count === 0) {
            setIsloaded(true)
          }
        }).catch((err) => console.log(err))
    });
  }

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      watchlist.length > 0 ? getMovies(watchlist) :
        setIsloaded(true)
    }

    !email && checkToken()

    return () => (isMountedRef.current = false);
    // eslint-disable-next-line
  }, [watchlist]);

    return (
      <>
     {!isloaded ? <Spinner /> :
      <>
        {watchlistmovie.length > 0 ? (
            <div className="movie-containor">
              {watchlistmovie.map((movie) => (
                <DisplayMovies {...movie} key={movie.id} />
              ))}
            </div>
          ) : (
            <div className="watchlist-div">
              <h3>No Watchlist Movies </h3>
              <h3> Add some !</h3>
            </div>
        )}
      </>
      }
      </>
    );
}

export default WatchList;
