import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Nav,  Navbar } from 'react-bootstrap';
import PopModal from "../tools/PopModal";
import { useNavigate, useLocation } from 'react-router-dom';
import Context from '../../context/Context'
import './styles/nav.css';


const NavBar1 = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isAuth } = useContext(Context)
 
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(null);
  const [show, setShow] = useState(false);

  const handleSubmit = () => {
    if (searchTerm.length >= 1) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const home = () => {
   window.location = '/popular/1'
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const showInput = () => {
    if (search === null) {
     return setSearch(true)
    }
    setSearch(!search);
    setSearchTerm("");
  };

  const handleLogin = () => {
    isAuth ? window.location = "/auth/home" : navigate("/auth/log-in");
    setShow(false);
  };

  const handleWatchlist = () => {
    if (isAuth) {
      window.location = '/auth/watchlist'
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="home" onClick={home}>
          React-Movie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setSearch(null)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav
              style={{
                margin: 5,
                color:
                  "/auth/log-in" === pathname
                    ? "black"
                    : "/auth/home" === pathname
                    ? "black"
                    : "gray",
                cursor: "pointer",
              }}
              onClick={handleLogin}
            >
              {" "}
              {isAuth ? "Profile" : "Log in"}{" "}
            </Nav>

            <Nav
              style={{
                margin: 5,
                color:
                  "/auth/watchlist" === pathname
                    ? "black"
                    : "gray",
                cursor: "pointer",
              }}
              onClick={handleWatchlist}
            >
              Watchlist
            </Nav>
          </Nav>

          <PopModal
            show={show}
            setShow={setShow}
            handleLogin={handleLogin}
            message="Sorry, You are not logged in to go to Watchlist page !"
          />

          <div
            className={search === null ? 'Search-containor' : search ? "Search-containor expend" : "Search-containor close"}
          >
            <div
              style={{ height: "100%", display: "flex", alignItems: "center" }}
              onClick={showInput}
            >
              <FaSearch className="fasearch" />
            </div>
            {search && (
              <form className="form" onSubmit={handleSubmit}>
                <input
                  className="search"
                  type="search"
                  placeholder="Search by movie title"
                  value={searchTerm}
                  onChange={handleOnChange}
                />
              </form>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar1;
