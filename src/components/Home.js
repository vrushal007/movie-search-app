import React, { useEffect, useRef, useState } from 'react'
import { useSearchMoviesQuery } from '../api/movieApi'
import { useLocation, useNavigate } from 'react-router-dom'
import MovieItem from './MovieItem'
import classes from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { favouritesActions } from '../slice/favourites-slice'
import { searchActions } from '../slice/search-slice'

function Home () {
  const location = useLocation()
  const navigate = useNavigate()
  const [sortByYear, setSortByYear] = useState(false)
  const [sortByTitle, setSortByTitle] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const searchTermRef = useRef()
  const yearInpRef = useRef()

  const moviesData = useSelector(state => state.search.movies)
  const favMovies = useSelector(state => state.favourite.movies)

  const movies = moviesData?.map(movie => {
    const isFavourite = favMovies?.some(
      favMovie => favMovie.imdbID === movie.imdbID
    )
    return {
      ...movie,
      favourite: isFavourite
    }
  })

  const queryParams = new URLSearchParams(location.search)
  const searchValue = queryParams.get('search')
  const yearValue = queryParams.get('year')

  const { data, isLoading, isSuccess, isError, error } = useSearchMoviesQuery({
    title: searchValue,
    year: yearValue ? yearValue : ''
  })

  useEffect(() => {
    // isSuccess && data.Response === 'True' && setMovies(data.Search)
    isSuccess &&
      data.Response === 'True' &&
      dispatch(
        searchActions.updateMoviesList({
          movies: data.Search,
          sortByYear: false,
          sortByTitle: false
        })
      )
  }, [isSuccess, data, dispatch])

  const moviesPerPage = 5
  const totalPages = Math.ceil(movies?.length / moviesPerPage)
  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    if (sortByYear) {
      dispatch(
        searchActions.updateMoviesList({
          movies: data.Search,
          sortByYear: true
        })
      )
    }
    if (sortByTitle) {
      dispatch(
        searchActions.updateMoviesList({
          movies: data.Search,
          sortByTitle: true
        })
      )
    }
  }, [dispatch, sortByTitle, sortByYear, data])

  const searchHandler = () => {
    navigate(`?search=${searchTermRef.current.value}`)
    searchTermRef.current.value = ''
  }

  const searchByYearHandler = () => {
    navigate(`?search=${searchValue}&year=${yearInpRef.current.value}`)
    yearInpRef.current.value = ''
  }

  const addToFavouriteHandler = movie => {
    dispatch(favouritesActions.addMovieToFavourite(movie))
  }

  const sortByYearChangeHandler = async () => {
    setSortByYear(prev => !prev)
    setSortByTitle(false)
  }

  const sortByTitleChangeHandler = () => {
    setSortByTitle(prev => !prev)
    setSortByYear(false)
  }

  return (
    <div className={classes.movieList}>
      <div className={classes.searchContainer}>
        <input
          type='text'
          placeholder='Search movies...'
          ref={searchTermRef}
          className={classes.searchInput}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              searchHandler()
            }
          }}
        />
        <button onClick={searchHandler} className={classes.searchButton}>
          Search
        </button>
      </div>
      <div className={classes.sortContainer}>
        <label className={classes.sortLabel}>
          Sort by Year:
          <input
            type='checkbox'
            checked={sortByYear}
            onChange={sortByYearChangeHandler}
            className={classes.sortCheckbox}
          />
        </label>
        <label className={classes.sortLabel}>
          Sort by Title:
          <input
            type='checkbox'
            checked={sortByTitle}
            onChange={sortByTitleChangeHandler}
            className={classes.sortCheckbox}
          />
        </label>
        <label className={classes.sortLabel}>
          Search by Year :
          <input
            type='number'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                searchByYearHandler()
              }
            }}
            className={classes.searchInput}
            ref={yearInpRef}
            disabled={searchValue ? false : true}
          />
          <button
            className={`${classes.searchButton}`}
            onClick={searchByYearHandler}
            disabled={searchValue ? false : true}
          >
            Click
          </button>
        </label>
      </div>
      <h2>
        Search Results for "{searchValue} (
        {`for year ${yearValue ? yearValue : 'N/A'}`})"
      </h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong. {error.error}</p>}
      {data?.Error && <p>{data.Error}</p>}
      {isSuccess &&
        currentMovies?.map(item => (
          <MovieItem
            key={item.imdbID}
            item={item}
            name='Add to Favourite'
            onAdd={addToFavouriteHandler}
            type='add'
          />
        ))}

      <div className={classes.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`${classes.pageButton} ${
              currentPage === index + 1 ? classes.activePage : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Home
