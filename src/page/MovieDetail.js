import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/movieActions";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Reviews from "../component/Reviews";
import MovieSlide from "../component/MovieSlide";
import Trailer from "../component/Trailer";
// import api from "../redux/api";
// import axios from "axios";

// const API_KEY = process.env.REACT_APP_API_KEY;
const MovieDetail = () => {
  // const [movieDetails, setMovieDetails] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const [component, setComponent] = useState();

  const [modalShow, setModalShow] = useState(false);
  
  const componentChoice = (e) => {
    let name = e
    setComponent(name)
  }

  useEffect(() => {
    // const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    // axios
    //   .get(url)
    //   .then((response) => setMovieDetails(response.data))
    //   .catch((error) => console.log(error));
    dispatch(movieAction.getDetailMovie(id))
  }, [id]);

  // console.log(id);

  const { movieDetails, movieReviews, movieRelated, loading, movieTrailer } = useSelector((state) => state.movies);
  // const movieDetails = state.movies.movieDetails
  // const loading = state.movies.loading;

  // 버튼 클릭 시, 보여주는 컴포넌트
  const selectComponent = {
    review: <Reviews movieReviews={movieReviews} />,
    related: <MovieSlide movies={movieRelated}/>  //관련 영화도 Home의 슬라이드랑 같게 구현
  }
 
  // console.log("movieDetail.jsx", movieDetails);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="danger" className="loading" />
      </div>
    );
  }

  return (
    <div>
      {movieDetails.data ? (
        <Container className="detail-container">
          <Row>
            <Col lg={6} className="poster-area">
              <div
                className="poster"
                style={
                  movieDetails.data.poster_path
                    ? {
                        backgroundImage:
                          "url(" +
                          `https://www.themoviedb.org/t/p/original///${movieDetails.data.poster_path}` +
                          ")",
                      }
                    : {
                        backgroundImage:
                          "url(" +
                          `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MIFyyHI37_Zt-rcG3udAQkvkvg60miBzJA&usqp=CAU` +
                          ")",
                      }
                }
              ></div>
            </Col>
            <Col>
              <div className="detail-content">
                <div>
                  {movieDetails.data.genres.map((item, index) => (
                    <Badge key={index} className="badge-style" bg="danger">
                      {item.name}
                    </Badge>
                  ))}
                </div>

                <div style={{ color: "white" }}>
                  <h1 className="detail-title">{movieDetails.data.title}</h1>
                </div>
                <div className="tagline">
                  <h2>{movieDetails.data.tagline}</h2>
                </div>
                <div className="rating">
                  <span>⭐ {movieDetails.data.vote_average.toFixed(1)}</span>
                  <span>👥 {movieDetails.data.popularity.toFixed(2)}</span>
                  <span
                    style={
                      movieDetails.data.adult
                        ? { color: "red" }
                        : { color: "green" }
                    }
                  >
                    {movieDetails.data.adult ? "R-rated" : "G-rated"}
                  </span>
                </div>
                <div className="overview">{movieDetails.data.overview}</div>
                <div className="detail-info">
                  <div style={{ display: "flex" }}>
                    <span className="detail-info-span">Revenue</span>
                    <p>$ {movieDetails.data.revenue.toLocaleString()}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <span className="detail-info-span">Running Time</span>
                    <p>{movieDetails.data.runtime} m</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <span className="detail-info-span">Release</span>
                    <p>{movieDetails.data.release_date}</p>
                  </div>
                </div>
                
                <div className="trailer">
                  <button className="watch-btn" onClick={() => setModalShow(true)}>
                  ➕ WATCH TRAILER
                  </button>
                  <Trailer
                    show={modalShow}
                    movieTrailer={movieTrailer.data}
                    movie={movieDetails.data}
                    onHide={() => setModalShow(false)}
                  />
                </div>

              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div>*** 오류 발생 ***</div>
      )}
      <Container className="detail-more-container">
        <button
          className="review-btn"
          onClick={() => componentChoice("review")}
        >
          Review ({movieReviews.data?.results.length})
        </button>
        <button
          className="related-btn"
          onClick={() => componentChoice("related")}
        >
          Related
        </button>
        {component && (
          <div className="detail-more-content">
            {selectComponent[component]}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MovieDetail;
