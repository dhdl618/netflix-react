// API 호출방법 (fetch, ajax, axios 중 axios를 사용해보는 실습)
// fetch는 설치가 따로 필요없지만 axios는 라이브러리 설치 필요
// 추후에 node.js를 이용할 시 fetch 사용 불가
// axios가 fetch보다 많이 쓰이며 기능이 더 많음

import api from "../api"
import { movieActions } from "../reduce/movieReducer"

const API_KEY=process.env.REACT_APP_API_KEY
function getMovies() {
    return async(dispatch)=>{
        try {
            dispatch(movieActions.startLoadingSpinner())
            
            const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            
            const topRatedApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)

            const upcomingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
        
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
            // 각각의 api 호출을 동시에 진행 시킴 (각각에 await을 쓸 필요 없음)
            let data = await Promise.all([popularMovieApi,topRatedApi,upcomingApi,genreApi])
            
            let [popularMovies, topMovies, upcomingMovies, genreList] = data

            // console.log("장르",genreList)

            dispatch(movieActions.getAllMovies({popularMovies, topMovies, upcomingMovies}))
            dispatch(movieActions.endLoadingSpinner())
            dispatch(movieActions.getGenreList({genreList}))
            
        } catch(e) {
            dispatch(movieActions.getMoviesFailure())
            console.log("Error 발생")
        }
        
        
    }
}

function getDetailMovie(id) {
    return async(dispatch) => {
        try{
            const movieDetails = await api.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`)
        
            dispatch(movieActions.getMovieDetails({movieDetails}))
            console.log(movieDetails)
            
        } catch (e) {
            dispatch(movieActions.getMoviesFailure())
            console.log("Error 발생")
        }   
    }
}

export const movieAction = {getMovies, getDetailMovie}