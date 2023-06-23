import {configureStore} from "@reduxjs/toolkit";
import {movieApi} from "./api/movieApi";
import favouritesSlice from "./slice/favourites-slice";

const store = configureStore({
    reducer:{
        [movieApi.reducerPath]:movieApi.reducer,
        favourite:favouritesSlice.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware)
})

export default store;