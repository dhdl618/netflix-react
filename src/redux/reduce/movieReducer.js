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
  minYear: "1930",
  maxYear: "2022",
  sortingMoviesByOptions: {},
  searchingKeywords: "",
  clickedGenres: "",
  clickedSortingOption: "",
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
    setMinYear(state, action) {
      state.minYear = action.payload.minYear;
      console.log("Min ??? ???????????????", action.payload.minYear);
    },
    setMaxYear(state, action) {
      state.maxYear = action.payload.maxYear;
      console.log("Max ??? ??? ???????????????", action.payload.maxYear);
    },
    getSortingByOptions(state, action) {
      state.sortingMoviesByOptions = action.payload.sortByOptions;
      console.log("?????? ??? ???????????????", action.payload.sortByOptions);
    },
    setSearchingKeywords(state, action) {
      state.searchingKeywords = action.payload.keyword;
    },
    setSortingOption(state, action) {
      state.clickedSortingOption = action.payload.sortBy;
      console.log(
        "?????? ????????? state??? ??????????????????",
        state.clickedSortingOption
      );
    },
    setGenres(state, action) {
      state.clickedGenres = action.payload.genreOption;
      console.log("????????? state??? ??????????????????", state.clickedGenres);
    },
  },
});

export default movieSlice.reducer;
export const movieActions = movieSlice.actions;
