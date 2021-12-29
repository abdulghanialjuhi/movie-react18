import React, { useContext, useState } from "react";
import Context from "../../context/Context";
import PopModal from "../tools/PopModal";
import { useNavigate } from 'react-router-dom';
import SessionAlert from "../tools/SessionAlert";
import { Spinner } from "react-bootstrap";
import httpClient from "../../httpClient";


export default function WatchlistBtn({ items }) {
  
  const { isAuth, watchlist, actions } = useContext(Context);
  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(false);
  const [alertErr, setAlertErr] = useState();

  let storedMovie = watchlist && watchlist.find((o) => o === items.id.toString());
  const watchlistDisabled = storedMovie ? true : false;


  const handleLogin = () => {
    navigate("/auth");
    setShow(false);
  };

  const addNewMovie = async () => {
    setLoading(true)

    httpClient('/add_movie', {
      params: {
        movie_id: items.id
      }
    })
    .then((res) => {
      if (res.data === 'Success') {
        actions({type: 'set_watchlist', payload: [...watchlist, items.id.toString()] })
      } 
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false)
      setSession(true)
      if (err.response.status === 401) {
        setAlertErr('Sorry, Your session has ended')
      } else  {
        setAlertErr('Error, Try again')
      }
      setTimeout(() => window.location = '/popular/1', 2000)

    })
  }

  const removeMovie = () => {
    setLoading(true)
    
    httpClient('/remove_watchlist', {
      params: {
        movie_id: items.id
      }
    })
    .then((res) => {
      if (res.data === 'Success') {
        const remove = watchlist.filter((w) => w !== items.id.toString());
        actions({type: 'set_watchlist', payload: remove })
      }
      setLoading(false)
    })    
    .catch((err) => {
      setLoading(false)
      setSession(true)
      if (err.response.status === 401) {
        setAlertErr('Sorry, Your session has ended')
      } else  {
        setAlertErr('Error, Try again')
      }
      setTimeout(() => window.location = '/popular/1', 2000)
    })
    
  }

  const handleWatchList = () => {
    if (isAuth) {
      if (!watchlistDisabled) {
        addNewMovie()
      } else if (watchlistDisabled) {
        removeMovie()
      }
    } else {
      setShow(true);
    }
  };

  return (
    <div className="watch-div">
      <PopModal
        show={show}
        setShow={setShow}
        handleLogin={handleLogin}
        message="Sorry, you are not logged in to add this movie to your Watchlist !"
      />
     {session && <SessionAlert alertErr={alertErr} />}
      <button
        className={
          isAuth
            ? watchlistDisabled
              ? "watch-btn watchlisted"
              : "watch-btn"
            : "watch-btn"
        }
        onClick={handleWatchList}
        disabled={loading}
      >
        {!loading ? isAuth
          ? watchlistDisabled
            ? "Remove from my watchlist"
            : "Add to my watchlist"
          : "Add to my watchlist" : <Spinner animation='border' style={{width: 15, height:15}} />}
      </button>
    </div>
  );
}
