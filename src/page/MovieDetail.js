import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/movieActions";
import { Container, Row, Col } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
// import api from "../redux/api";
// import axios from "axios";

// const API_KEY = process.env.REACT_APP_API_KEY;
const MovieDetail = () => {
  // const [movieDetails, setMovieDetails] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    // const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    // axios
    //   .get(url)
    //   .then((response) => setMovieDetails(response.data))
    //   .catch((error) => console.log(error));
    dispatch(movieAction.getDetailMovie(id))
  }, [id]);

  console.log(id);

  const { movieDetails, movieReviews, loading } = useSelector((state) => state.movies);
  // const movieDetails = state.movies.movieDetails
  // const loading = state.movies.loading;

  console.log("movieDetail.jsx", movieDetails);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="danger" className="loading" />
      </div>
    );
  }

  const hi = () => {
    console.log("HI")
  }

  return (
    <div>
      {movieDetails.data ? (
        <Container className="detail-container">
          <Row>
            <Col>
              <div
                className="poster"
                style={{
                  backgroundImage:
                    "url(" +
                    `https://www.themoviedb.org/t/p/original///${movieDetails.data.poster_path}` +
                    ")",
                }}
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
                  <h1>{movieDetails.data.title}</h1>
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
                  <div style={{display: "flex"}}>
                    <span className="detail-info-span">Revenue</span>
                    <p>$ {movieDetails.data.revenue.toLocaleString()}</p>
                  </div>
                  <div style={{display: "flex"}}>
                    <span className="detail-info-span">Running Time</span>
                    <p>{movieDetails.data.runtime} m</p>
                  </div>
                  <div style={{display: "flex"}}>
                    <span className="detail-info-span">Release</span>
                    <p>{movieDetails.data.release_date}</p>
                  </div>
                </div>
                <div className="trailer">
                  WATCH TRAILER
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div>안나왕 ㅠ</div>
      )}
      <Container className="review-container">
        <button className="review-btn" onClick={()=>hi()}>
          Review
        </button>
        <button className="related-btn">
          Related
        </button>
        {movieReviews.data ?
        <div className="reviews">
          {movieReviews.data.results.map((review, index) => (
            // {console.log(review)}
            <div className="review-card" key={index}>
              <div className="author">「{review.author}」</div>
              <div className="review-content">{review.content}</div>
              <div className="review-date">Date {review.updated_at.substr(0,10)}</div>
            </div>
          ))}
        </div> :
        <div>
          리뷰도 안나왕 ㅠ
        </div>
        }
      </Container>
    </div>
  );
};

export default MovieDetail;
