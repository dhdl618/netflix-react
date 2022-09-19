import {React, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/movieActions";
import { Container, Row, Col } from "react-bootstrap";
import { Badge } from 'react-bootstrap'

const MovieDetail = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(()=>{
    dispatch(movieAction.getDetailMovie(id));
  },[id])

  console.log(id)

  const state = useSelector(state=>state)
  const movieDetails = state.movies.movieDetails
  
  console.log(movieDetails)

  return (
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
          >
          </div>
        </Col>
        <Col>
          <div className="detail-content">
            <div>
              {movieDetails.data.genres.map((item)=>
                <Badge className="badge-style" bg="danger">{item.name}</Badge>
              )}
            </div>
            <div style={{color:"white"}}>
              <h2>{movieDetails && movieDetails.data.title}</h2>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
