import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  loading: true,
  genreList: [],
  movieDetails: {},
  movieReviews: {},
  movieRelated: {},
  movieTrailer: {},
  searchMovies: {},
  popularAsc: {},
  popularDesc: {},
  newestAsc: {},
  newestDesc: {},
  sortingWords: "",
  minYear: "1930",
  maxYear: "2022",
  sortingMoviesByGenre: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getAllMovies(state, action) {
      state.popularMovies = action.payload.popularMovies;
      state.topRatedMovies = action.payload.topMovies;
      state.upcomingMovies = action.payload.upcomingMovies;
    },
    startLoadingSpinner(state) {
      state.loading = true;
    },
    endLoadingSpinner(state) {
      state.loading = false;
    },
    getMoviesFailure(state) {
      state.loading = false;
    },
    getGenreList(state, action) {
      state.genreList = action.payload.genreList.data.genres;
    },
    getMovieDetails(state, action) {
      state.movieDetails = action.payload.movieDetails;
    },
    getMovieReviews(state, action) {
      state.movieReviews = action.payload.movieReviews;
    },
    getMovieRelated(state, action) {
      state.movieRelated = action.payload.movieRelated;
    },
    getMovieTrailer(state, action) {
      state.movieTrailer = action.payload.movieTrailer;
    },
    getSearchMovies(state, action) {
      state.searchMovies = action.payload.searchMovies;
    },
    getPopularAscMovies(state, action) {
      state.popularAsc = action.payload.popularAsc;
    },
    getPopularDescMovies(state, action) {
      state.popularDesc = action.payload.popularDesc;
    },
    getNewestAscMovies(state, action) {
      state.newestAsc = action.payload.newestAsc;
    },
    getNewestDescMovies(state, action) {
      state.newestDesc = action.payload.newestDesc;
    },
    getSortingKeyword(state, action) {
      state.sortingWords = action.payload.sortingWords;
      console.log("리덕스에서알립니다", action.payload.sortingWords);
    },
    setMinYear(state, action) {
      state.minYear = action.payload.minYear;
      console.log("Min 값 들어왔나요", action.payload.minYear);
    },
    setMaxYear(state, action) {
      state.maxYear = action.payload.maxYear;
      console.log("Max 값 잘 들어왔나요", action.payload.maxYear);
    },
    getSortingByGenre(state, action) {
      state.sortingMoviesByGenre = action.payload.sortByGenreClicked;
      console.log("장르 잘 들어왔나요", action.payload.sortByGenreClicked);
    },
  },
});

export default movieSlice.reducer;
export const movieActions = movieSlice.actions;
