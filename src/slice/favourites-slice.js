import {createSlice} from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
    name:'favourite',
    initialState:{
        movies:[]
    },
    reducers:{
        addMovieToFavourite(state,action){
            const isPresent = state.movies.some(movie => movie.imdbID === action.payload.imdbID)
            if(!isPresent){
                state.movies.push(action.payload)
            }
        },
        removeMovieFromFavourite(state,action){
            state.movies = state.movies.filter((item) => item.imdbID !== action.payload)
        }
    }
})

export const favouritesActions = favouritesSlice.actions

export default favouritesSlice;