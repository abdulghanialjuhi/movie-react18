import React, { useState, useEffect, useContext } from "react";
import Context from "../../context/Context";
import Spinner from "../tools/Spinner";

export default function Getgener(props) {
  const [movieGen, setMovieGen] = useState([]);
  const [load, setLoad] = useState(false);
  const { movieInfo } = useContext(Context);

  useEffect(() => {
    let isMounted = true;

    fetch(movieInfo(props.id))
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          const genresName = data.genres.slice(0, 3);
          setMovieGen(genresName);
          setLoad(true);
        }
      });

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

    return (
      <>
     {!load ? <Spinner /> :
       <ul>
        <div>
          {movieGen.map((genreName) => (
            <li className={props.class} key={genreName.id}>
              {genreName.name}
            </li>
          ))}
        </div>
      </ul>}
      </>
    );
}
