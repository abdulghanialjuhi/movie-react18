import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation, 
} from "react-router-dom";
import "./App.css";
import SearchU from "./component/nav/Nav";
import MovieQ from "./component/movieInfo/Movie";
import Movies from "./component/pages/Movies";
import SearchUrl from "./component/nav/search/SearchUrl";
import Context from "./context/Context";
import useGlobalstate from "./context/useGlobal";
import NotFound from "./component/NotFound";
import Layout from "./component/Layout";
import AuthUser from './component/user_auth/AuthUser';
import IdleUser from "./component/idletimer/IdleUser";
import Spinner from './component/tools/Spinner'

function App() {

  const { key } = useLocation()
  const store = useGlobalstate();

  return (
   <Context.Provider value={store}> 
        <IdleUser></IdleUser>
     {!store.loading ? <Routes>

          <Route exact path="/" element={<Navigate to="/popular/1" />} />

          <Route path='/auth/*' element={
            <>
            <SearchU />
            <div className="authUser-container">
              <AuthUser/>
            </div>
            </>
          }/>

          <Route
            exact
            path="/popular/:id"
            element={
              <>
              <Layout>
                <Movies name='popular' key={key} />
              </Layout>
              </>
            }
          />

          <Route
            exact
            path="/top_rated/:id"
            element={
              <>
              <Layout>
                <Movies name='top_rated' key={key} />
              </Layout>
              </>
            }
          />

          <Route
            exact
            path="/upcoming/:id"
            element={
              <>
              <Layout>
                <Movies name='upcoming' key={key} />
              </Layout>
              </>
            }
          />

          <Route
            path="/movie/:id"
            element={
              <>
              <div className="movie-info-container">
                <SearchU />
                <MovieQ key={key} />
              </div>
              </>
            }
          />

          <Route
            path="/search/:name"
            element={
              <>
                <SearchU />
                <div
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  className="flex"
                >
                  <div
                    style={{
                      width: "89%",
                      justifyContent: "center",
                    }}
                  >
                    <SearchUrl key={key} />
                  </div>
                </div>
              </>
            }
          />

          <Route
            path="*"
            element={
              <>
                <SearchU />
                <NotFound />
              </>
            }
          />
      </Routes>
      
    : <Spinner />}
    </Context.Provider>
  );
}

export default App;
