// API 호출방법 (fetch, ajax, axios 중 axios를 사용해보는 실습)
// fetch는 설치가 따로 필요없지만 axios는 라이브러리 설치 필요
// 추후에 node.js를 이용할 시 fetch 사용 불가
// axios가 fetch보다 많이 쓰이며 기능이 더 많음

import api from "../api";
import { movieActions } from "../reduce/movieReducer";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies(pageNum) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.startLoadingSpinner());
      console.log("무비액션", pageNum);

      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );

      const topRatedApi = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );

      const upcomingApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );

      const genreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      // 각각의 api 호출을 동시에 진행 시킴 (각각에 await을 쓸 필요 없음)
      let data = await Promise.all([
        popularMovieApi,
        topRatedApi,
        upcomingApi,
        genreApi,
      ]);

      let [popularMovies, topMovies, upcomingMovies, genreList] = data;

      // console.log("장르",genreList)

      dispatch(
        movieActions.getAllMovies({ popularMovies, topMovies, upcomingMovies })
      );
      dispatch(movieActions.endLoadingSpinner());
      dispatch(movieActions.getGenreList({ genreList }));
    } catch (e) {
      dispatch(movieActions.getMoviesFailure());
      console.log("Error 발생");
    }
  };
}

function getDetailMovie(id) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.startLoadingSpinner());

      const movieDetailApi = api.get(
        `/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const movieReviewsApi = api.get(
        `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );
      const movieRelatedApi = api.get(
        `/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
      );
      const genreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const movieTrailerApi = api.get(
        `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );

      let data = await Promise.all([
        movieDetailApi,
        movieReviewsApi,
        movieRelatedApi,
        genreApi,
        movieTrailerApi,
      ]);

      let [movieDetails, movieReviews, movieRelated, genreList, movieTrailer] =
        data;

      dispatch(movieActions.getMovieDetails({ movieDetails }));
      dispatch(movieActions.getMovieReviews({ movieReviews }));
      dispatch(movieActions.getMovieRelated({ movieRelated }));
      dispatch(movieActions.getGenreList({ genreList }));
      dispatch(movieActions.getMovieTrailer({ movieTrailer }));

      dispatch(movieActions.endLoadingSpinner());
      // console.log("movieActions.js",movieDetails)
      console.log("리뷰", movieReviews);
      console.log("관련", movieRelated);
    } catch (e) {
      dispatch(movieActions.getMoviesFailure());
      console.log("Error 발생");
    }
  };
}

function getSearchMovies(keyword, pageNum) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.startLoadingSpinner());

      const searchMoviesApi = api.get(
        `/search/movie?api_key=${API_KEY}&query=${keyword}&page=${pageNum}`
      );

      let data = await Promise.all([searchMoviesApi]);
      let [searchMovies] = data;

      dispatch(movieActions.getSearchMovies({ searchMovies }));

      dispatch(movieActions.endLoadingSpinner());
    } catch (e) {
      dispatch(movieActions.getMoviesFailure());
      console.log("Error 발생");
    }
  };
}

function sortingMovies(popularAsc, popularDesc, newestAsc, newestDesc) {
  return async (dispatch) => {
    try {
      console.log("미들웨어에는 도착을 했나요?", popularAsc, newestAsc);
      dispatch(movieActions.getPopularAscMovies({ popularAsc }));
      dispatch(movieActions.getPopularDescMovies({ popularDesc }));
      dispatch(movieActions.getNewestAscMovies({ newestAsc }));
      dispatch(movieActions.getNewestDescMovies({ newestDesc }));
      // console.log("액션에서 알립니다", newestAsc);
    } catch (e) {
      dispatch(movieActions.getMoviesFailure());
      console.log("Error 발생");
    }
  };
}

function setYear(minYear, maxYear) {
  return (dispatch) => {
    try {
      console.log("min값, max값은", minYear, maxYear);
      dispatch(movieActions.setMinYear({ minYear }));
      dispatch(movieActions.setMaxYear({ maxYear }));
    } catch (e) {
      dispatch(movieActions.getMoviesFailure());
      console.log("Error 발생");
    }
  };
}

function sortingByGenre(genreClicked) {
  return (dispatch) => {
    try {
      console.log("선택된 장르", genreClicked);
      dispatch(movieActions.getSortingByGenre({ genreClicked }));
    } catch (e) {
      dispatch(movieActions.getMoviesFailure());
      console.log("Error 발생");
    }
  };
}

function sortingByOption(
  genre,
  sortBy,
  releaseDateMin,
  releaseDateMax,
  pageNum
) {
  return async (dispatch) => {
    try {
      console.log("받아들인 장르 넘버 값", genre);
      let genreOption = genre.join("|");
      console.log("장르 넘버 합친 값", genreOption);
      console.log("sort by", sortBy);
      console.log("release_date Min 값", releaseDateMin);
      console.log("release_date Max 값", releaseDateMax);
      console.log("pageNum 값", pageNum);
      // console.log("keyword 값", keyword);

      dispatch(movieActions.setSortingOption({ sortBy }));
      dispatch(movieActions.setGenres({ genreOption }));

      const sortingByOptions = api.get(
        // with_genres=27,10749 ...  ,로 구분 >> 27,10749 둘 다 포함하는 영화,  with_genres=27|10749 ...  |로 구분 >> 27을 포함하거나 10749를 포함하는 영화
        `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreOption}&sort_by=${sortBy}&release_date.gte=${releaseDateMin}-01-01&release_date.lte=${releaseDateMax}-12-31&page=${pageNum}`
      );

      let data = await Promise.all([sortingByOptions]);
      let [sortByOptions] = data;

      console.log("장르 정렬한 결과", sortByOptions);

      dispatch(movieActions.getSortingByOptions({ sortByOptions }));
    } catch (e) {
      dispatch(movieActions.getMoviesFailure());
      console.log("Error 발생");
    }
  };
}

// 키워드 아이디 가져오기

// function getKeywordsIDs() {
//   return async (dispatch) => {
//     try {
//       let date = new Date();
//       let year = date.getFullYear();
//       let month = date.getMonth() + 1;
//       let day = date.getDate();

//       if (month < 10) {
//         month = `0${date.getMonth() + 1}`;
//       }

//       const IDdataAPI = axios.get(
//         `http://files.tmdb.org/p/exports/keyword_ids_${month}_${day}_${year}.json.gz`
//       );
//       let data = await Promise.all([IDdataAPI]);
//       let [IDdata] = data;

//       console.log("키워드 id 값 결과", IDdata);
//     } catch (e) {
//       dispatch(movieActions.getMoviesFailure());
//       console.log("Error 발생");
//     }
//   };
// }

export const movieAction = {
  getMovies,
  getDetailMovie,
  getSearchMovies,
  sortingMovies,
  setYear,
  sortingByGenre,
  sortingByOption,
};
