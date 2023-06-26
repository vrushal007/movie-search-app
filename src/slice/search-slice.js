import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    movies: [],
    sortByYear: false,
    sortByTitle: false
  },
  reducers: {
    updateMoviesList (state, action) {
      state.movies = action.payload.movies || state.movies || []
      if (action.payload?.sortByTitle) {
        state.movies =
          state.movies?.length > 0 ?
          [...state.movies].sort((a, b) => {
            if (a.Title > b.Title) {
              return 1
            }
            if (a.Title < b.Title) {
              return -1
            }
            return 0
          }) : []
        state.sortByYear = false
        state.sortByTitle = true
      }
      if (action.payload?.sortByYear) {
        state.movies = [...state.movies]?.sort((a, b) => a.Year - b.Year)
        state.sortByTitle = false
        state.sortByYear = true
      }
    }
  }
})

export const searchActions = searchSlice.actions

export default searchSlice
