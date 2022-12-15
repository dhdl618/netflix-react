import React, { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { movieActions } from "../redux/reduce/movieReducer";
import { movieAction } from "../redux/actions/movieActions";

const NavBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleChange = ({ target: { value } }) => {
    // console.log("쓰는 값은?", value)
    setKeyword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(movieActions.setSearchingKeywords({ keyword }));
    navigate(`/movies?query=${keyword}`);
  };
  // console.log("나올까요??", getMovies)

  const init = () => {
    dispatch(movieActions.getSortingKeyword({}));

    window.location.replace("/movies");
  };

  return (
    <div className="navbar-container">
      <Navbar bg="black" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img
                style={{ margin: "0px 50px 0px 20px" }}
                width={100}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/" className="nav-item">
                Home
              </Link>
              <Link to="/movies" className="nav-item" onClick={init}>
                Movies
              </Link>
            </Nav>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Search movies"
                className="nav-input"
                type="keyword"
                onChange={handleChange}
              ></input>
              <button className="nav-btn" type="submit">
                search
              </button>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
