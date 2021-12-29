import React, { useEffect, useState, useContext } from "react";
import MovieInfo from "./ShowInfo";
import GetIframe from "./video/Getvideo";
import Similer from "./similar/Similer";
import Cast from "./Cast";
import Context from "../../context/Context";
import { useParams  } from 'react-router-dom';
import './style/movieInfo.css'
import Spinner from "../tools/Spinner";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function Movie() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { movieInfo } = useContext(Context);
  const {id} = useParams()

  useEffect(() => {
    let isMounted = true;

    fetch(movieInfo(id))
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setItems(data);
          setIsLoaded(true);
        }
      });

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

    return (
      <>
      {!isLoaded ? <Spinner /> :
      <div
        className="backdrop-image"
        style={{
          height: "95vh",
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url(${
              items.backdrop_path
                ? IMAGE_URL + items.backdrop_path
                : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
            })`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex-container">
          <div className="containor-info">
            <MovieInfo {...items} items={items} />
            <Cast id={id} isLoaded={isLoaded} />
            <GetIframe id={id} isLoaded={isLoaded} />
            <Similer isLoaded={isLoaded} />
          </div>
        </div>
      </div>}
      </>
    );
}
