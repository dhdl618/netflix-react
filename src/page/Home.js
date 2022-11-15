import React from "react";
import { useEffect } from "react";
import { movieAction } from "../redux/actions/movieActions";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Banner from "../component/Banner";
import MovieSlide from "../component/MovieSlide";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieAction.getMovies(1));
  }, []);

  const state = useSelector((state) => state.movies);
  const popularMovies = state.popularMovies;
  const topRatedMovies = state.topRatedMovies;
  const upcomingMovies = state.upcomingMovies;
  const loading = state.loading;

  console.log(popularMovies, topRatedMovies, upcomingMovies)

  //로딩이 true면 스피너를 보여주고 false면 데이터를 보여줌
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="danger" className="loading" />
      </div>
    );
  }

  return (
    <div className="main-container">
      {popularMovies.data ? (
        <div>
          <Banner movie={popularMovies.data.results[0]} />
          <p className="category">Popular</p>
          <MovieSlide movies={popularMovies} />
          <p className="category">Top</p>
          <MovieSlide movies={topRatedMovies} />
          <p className="category">Upcoming</p>
          <MovieSlide movies={upcomingMovies} />
        </div>
      ) : (
        <div>*** 오류 발생 ***</div>
      )}
    </div>
  );
};

export default Home;
