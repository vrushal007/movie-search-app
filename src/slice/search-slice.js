import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'search',
    initialState:{
        movies:[],
        sortByYear:false,
        sortByTitle:false
    },
    reducers:{
        updateMoviesList(state,action){
            // console.log(action.payload)
            state.movies = action.payload.movies
            if(action.payload?.sortByTitle){
                state.movies = [...state.movies].sort((a, b) => {
                    if (a.Title > b.Title) {
                      return 1;
                    }
                    if (a.Title < b.Title) {
                      return -1;
                    }
                    return 0;
                  })
                state.sorted = false
            }
            if(action.payload?.sortByYear){
                state.movies = [...state.movies].sort((a,b)=>a.Year - b.Year)
                state.sorted = true
            }

        }
    }
})

export const searchActions = searchSlice.actions

export default searchSlice;