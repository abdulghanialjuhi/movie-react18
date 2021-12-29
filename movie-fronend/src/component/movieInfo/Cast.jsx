import React, { useState, useEffect, useContext } from "react";
import Context from "../../context/Context";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function Cast({ id, isLoaded }) {
  const [actors, setActors] = useState([]);
  const [all, setAll] = useState("none");
  const { getInfo } = useContext(Context);

  useEffect(() => {
    let isMounted = true;
    if (isLoaded) {
      fetch(getInfo(id, "credits"))
        .then((res) => res.json())
        .then(async (data) => {
          const cast = data.cast;
          if (isMounted) {
            await setActors(cast);
          }
        });
    }

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [id, isLoaded]);

  const handleAll = () => {
    if (all === "none") {
      setAll("block");
    } else {
      setAll("none");
    }
  };

  return (
    <div className="actors">
      <div className="actors-label">
        <h1 style={{ fontSize: 30 }}> Cast </h1>
      </div>
      {isLoaded && actors ? (
        <>
          <div className="actors-container">
            {actors.map((actor) => {
              return (
                <div
                  key={actor.cast_id}
                  className="actor-container"
                  style={{ display: actor.order < 6 ? "block" : all }}
                >
                  <div className="actor-img">
                    <img
                      style={{ width: 150, height: 225 }}
                      src={
                        actor.profile_path
                          ? IMAGE_URL + actor.profile_path
                          : "https://st4.depositphotos.com/1156795/20814/v/600/depositphotos_208142514-stock-illustration-profile-placeholder-image-gray-silhouette.jpg"
                      }
                      alt={actor.name}
                    />
                  </div>
                  <div className="label-container">
                    <h5> {actor.name} </h5>
                    <span> {actor.character} </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div onClick={handleAll} className="more-actors">
            <h5> {all === "none" ? "See all" : "See less"} </h5>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3> Not found </h3>
        </div>
      )}
    </div>
  );
}
