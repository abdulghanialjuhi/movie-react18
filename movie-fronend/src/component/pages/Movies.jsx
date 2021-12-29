import React, { useEffect, useState, useRef, useContext } from "react";
import DisplayMovies from "./DisplayMovies";
import PageButton from "../footer/Pagebutton";
import { useParams, useNavigate } from 'react-router-dom';
import './styles/main.css'
import Spinner from "../tools/Spinner";
import Context from "../../context/Context";

function Popular({ name }) {

  const { id } = useParams()
  const navigate = useNavigate()

  const [movies, setMovies] = useState([]);
  const [isload, setIsload] = useState(false);

  const { movieUrl } = useContext(Context);
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    fetchMovies(isMountedRef);

    return () => (isMountedRef.current = false);
    // eslint-disable-next-line
  }, []);

  const fetchMovies = async (isMountedRef) => {
    try {
      const res = await fetch(movieUrl(name, id));
      const data = await res.json();
      if (isMountedRef.current) {
        const movies = data.results;
        setMovies(movies);
        id <= data.total_pages
          ? setIsload(true)
          : data.total_pages <= 500 ? navigate(`/${name}/${data.total_pages}`) :
          navigate(`/${name}/500`)
      }
    } catch (err) {
      console.log(err);
    }
  };

    return (
      <>
      {!isload ? <Spinner /> :
      <>
        <div className="movie-containor">
          {movies.map((movie) => (
            <DisplayMovies {...movie} key={movie.id} isload={isload} />
            ))}
        </div>
        <PageButton id={id} path={`/${name}/`}navigate={navigate} />  
      </>
         }
      </>
    );
}

export default Popular;
