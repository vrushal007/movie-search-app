import {createSlice} from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
    name:'favourite',
    initialState:{
        movies:[]
    },
    reducers:{
        addMovieToFavourite(state,action){
            state.movies.push(action.payload)
        },
        removeMovieFromFavourite(state,action){
            state.movies = state.movies.filter((item) => item.imdbID !== action.payload)
        }
    }
})

export const favouritesActions = favouritesSlice.actions

export default favouritesSlice;