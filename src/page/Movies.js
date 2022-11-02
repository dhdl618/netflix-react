import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../component/Card'
import { Container, Row, Col} from "react-bootstrap";
import { movieAction } from "../redux/actions/movieActions";
import Spinner from "react-bootstrap/Spinner";
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  
  const state = useSelector((state)=>state.movies)
  const dispatch = useDispatch()
  const [query, setQuery] = useSearchParams()
  
  let searchQuery = query.get('query')
  console.log("쿼리", searchQuery)
  // 

    
  
    
    
  // const getMoviesWithQuery = () => {
    
  // }

  // getMoviesWithQuery()


  useEffect(()=>{
    if(searchQuery==="") {
      dispatch(movieAction.getMovies())
    } else {
      dispatch(movieAction.getSearchMovies(searchQuery))
    }
  },[query])

  let movies

  if(searchQuery) {
    movies = state.searchMovies.data?.results
  } else {
    movies = state.popularMovies.data?.results
  }

  // console.log("카드", movies)

  const loading = state.loading;

  //로딩이 true면 스피너를 보여주고 false면 데이터를 보여줌
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="danger" className="loading" />
      </div>
    );
  }

  return (
    <div className="movies-page">
      <Container>
        <Row>
          <Col lg={4} className="test"></Col>
          <Col lg={8}>
            <div className="movies-container">
              {movies?.map((item, index) => (
                <Card item={item} key={index} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Movies
