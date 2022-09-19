import React from 'react'
import { useEffect } from 'react'
import { movieAction } from '../redux/actions/movieActions'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import Banner from '../component/Banner'
import MovieSlide from '../component/MovieSlide'
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
    
    const dispatch = useDispatch()

    useEffect(()=>{
            dispatch(movieAction.getMovies())
        },[])

    const state = useSelector(state => state.movies)
    const popularMovies = state.popularMovies
    const topRatedMovies = state.topRatedMovies
    const upcomingMovies = state.upcomingMovies
    const loading = state.loading

    // console.log(popularMovies, topRatedMovies, upcomingMovies)    

    const override = {
      display: "block",
      margin: "auto",
      borderColor: "gray",
    };

    //로딩이 true면 스피너를 보여주고 false면 데이터를 보여줌
    if(loading) {
      return <ClipLoader color={override} loading={loading} cssOverride={override} size={100} />
    }

  return (
    <div className='main-container'>
      <Banner movie={popularMovies.data.results[0]}/>
      <p className='category'>Popular</p>
      <MovieSlide movies={popularMovies} />
      <p className='category'>Top</p>
      <MovieSlide movies={topRatedMovies} />
      <p className='category'>Upcoming</p>
      <MovieSlide movies={upcomingMovies} />
    </div>
  )
}

export default Home