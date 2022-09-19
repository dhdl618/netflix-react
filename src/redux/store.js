import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reduce/movieReducer";

const store = configureStore({
    reducer: {
        movies : movieReducer
    }
})

export default store