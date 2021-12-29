import { useState, useEffect } from "react";
import httpClient from '../httpClient';

const useGlobalstate = () => {

  const [watchlist, setWatchlist] = useState([]);

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [isAuth, setIsAuth] = useState(false)

  const actions = (action) => {
    const { type, payload } = action;

    switch (type) {
      case "set_watchlist":
        return setWatchlist(payload);
      case 'check_toekn':
        return checkToken();
      case 'set_auth':
        return setIsAuth(payload)
      default:
        return watchlist;
    }
  };

  const checkToken = () => {
    httpClient('/home')
    .then((res) => {
      if (res.data) {
       if (res.data.user_info ) {
        setName(res.data.user_info[0])
        setEmail(res.data.user_info[1])
        setIsAuth(true)
       } else setLoading(false)
      } else {
        setIsAuth(false)
        setLoading(false)
      }
    })
    .catch((err) => {
      console.log(err)
      setIsAuth(false)
      setLoading(false)
    })
  }
  
  const checkWatchList = async () => {
    try {
      let res = await httpClient('/get_watchlist')

      if (res.data !== 'Failed') {
        setWatchlist(res.data)
      } else {
        console.log('faild')
      }
    } catch (err) {
      console.log(err)
    }
    return email
  }

  useEffect(() => {
    checkToken()
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    isAuth && email && checkWatchList()
    .then(res => {
      setLoading(false)
    })
    // eslint-disable-next-line
  }, [email, isAuth])


  function movieUrl(movieType, id) {
    return `https://api.themoviedb.org/3/movie/${movieType}?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}&page=${id}`;
  }

  function movieInfo(id) {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
  }

  function getInfo(id, infoType) {
    return `https://api.themoviedb.org/3/movie/${id}/${infoType}?api_key=${process.env.REACT_APP_API_KEY}`;
  }

    return { actions, loading, name, email, isAuth, watchlist, checkToken, movieUrl, movieInfo, getInfo };
};

export default useGlobalstate;
