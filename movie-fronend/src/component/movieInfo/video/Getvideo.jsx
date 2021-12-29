import React, { useState, useEffect, useContext } from "react";
import Context from "../../../context/Context";
import Spinner from "../../tools/Spinner";

export default function GetIframe({ id, isLoaded }) {
  const [video, setVideo] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const { getInfo } = useContext(Context);
  useEffect(() => {
    let isMounted = true;

    fetchVideos(isMounted);

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  const fetchVideos = async (isMounted) => {
    if (isLoaded) {
      try {
        const res = await fetch(getInfo(id, "videos"));
        const data = await res.json();
        if (isMounted) {
          const videos = data.results;
          setVideo(videos);
          setIsLoad(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

 if (video.length > 0) {
    return (
      <>
     {!isLoad ? <Spinner /> :
      <div className="iframeContainer">
        <div className="trailer_div">
          <h3>Trailer</h3>
          <iframe
            className="iframe"
            src={`https://www.youtube.com/embed/${video[0].key}`}
            width="100%"
            title="myFrame"
            allowFullScreen
          />
        </div>
      </div>}
      </>
    );
  } else {
    return (
      <div className="iframeContainer">
        <div className="trailer_div">
          <h3>Trailer</h3>
          <h1 className="not-avalible"> Trailer Not Available ! </h1>
        </div>
      </div>
    );
  }
}
