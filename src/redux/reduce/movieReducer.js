import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovies: {},
    loading: true,
    genreList: [],
    movieDetails: {},
    movieReviews: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        getAllMovies(state, action) {
            state.popularMovies = action.payload.popularMovies
            state.topRatedMovies = action.payload.topMovies
            state.upcomingMovies = action.payload.upcomingMovies
        },
        startLoadingSpinner(state) {
            state.loading = true
        },
        endLoadingSpinner(state) {
            state.loading = false
        },
        getMoviesFailure(state) {
            state.loading = false
        },
        getGenreList(state, action) {
            state.genreList = action.payload.genreList.data.genres
        },
        getMovieDetails(state, action) {
            state.movieDetails = action.payload.movieDetails
        },
        getMovieReviews(state, action) {
            state.movieReviews = action.payload.movieReviews
        }
    }
})

export default movieSlice.reducer
export const movieActions = movieSlice.actions