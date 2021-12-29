import React, { useEffect, useState, useContext } from "react";
import GetSimilar from "./GetSimilar";
import Context from "../../../context/Context";
import { useParams } from 'react-router-dom';
import Spinner from "../../tools/Spinner";


export default function Similar({ isLoaded }) {
  const [similars, setSimilars] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const { id } = useParams()

  const { getInfo } = useContext(Context);

  useEffect(() => {
    let isMounted = true;
    if (isLoaded) {
      fetch(getInfo(id, "similar"))
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            const similar = data.results;
            setSimilars(similar);
            setIsLoad(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

 if (similars) {
    return (
      <>
    {!isLoad ? <Spinner /> :
      <div className="similar-containor">
        <h3 className="similar"> Similar Movies </h3>
        <div className="section">
          {similars.map((similar) => {
            return <GetSimilar {...similar} key={similar.id} />;
          })}
        </div>
      </div>}
      </>
    );
  } else {
    return (
      <div className="similar-containor">
        <h3 className="similar"> Similar Movies </h3>
        <div
          style={{
            width: "100%",
            height: 150,
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#fff" }}> Similar not found </h3>
        </div>
      </div>
    );
  }
}
