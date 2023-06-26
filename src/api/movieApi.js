import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apikey = 'cdc2475f'
export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://www.omdbapi.com'
  }),
  endpoints: builder => ({
    searchMovies: builder.query({
      query: ({title,year}) => {
        let url = `/?apikey=${apikey}`
        if(title?.length > 0){
            if(year?.length > 0){
                url = `/?apikey=${apikey}&s=${title}&y=${year}&plot=full`
            }else{
                url = `/?apikey=${apikey}&s=${title}&plot=full`
            }
        }
        return url
      }
    }),
    searchMovieById: builder.query({
      query: id => `/?apikey=${apikey}&i=${id}`
    })
  })
})

export const { useSearchMoviesQuery, useSearchMovieByIdQuery } = movieApi
