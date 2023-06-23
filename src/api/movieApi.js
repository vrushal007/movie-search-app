import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const apikey = 'cdc2475f'
export const movieApi = createApi({
    reducerPath:'movieApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://www.omdbapi.com',
        // prepareHeaders: (headers) => {
        //     headers.set('Authorization', `Bearer ${apikey}`);
        //     return headers;
        // }
    }),
    endpoints:(builder) => ({
        searchMovies: builder.query({
            query: (title) => title?.length > 0  ? `/?apikey=${apikey}&s=${title}&plot=full` : `/?apikey=${apikey}`
        }),
        searchMovieById: builder.query({
            query: id => `/?apikey=${apikey}&i=${id}`
        })
    })
})

export const { useSearchMoviesQuery, useSearchMovieByIdQuery } = movieApi