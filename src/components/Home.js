import React, { useEffect, useRef, useState } from 'react'
import { useSearchMoviesQuery } from '../api/movieApi'
import { useLocation, useNavigate } from 'react-router-dom'
import MovieItem from './MovieItem'
import classes from './Home.module.css'
import { useDispatch } from 'react-redux'
import { favouritesActions } from '../slice/favourites-slice'

function Home () {
  const location = useLocation()
  const navigate = useNavigate()
  const [sortByYear, setSortByYear] = useState(false)
  const [movies, setMovies] = useState([])
  const dispatch = useDispatch()
  const searchTermRef = useRef()
  const yearInpRef = useRef()

  const queryParams = new URLSearchParams(location.search)
  const searchValue = queryParams.get('search')
  const yearValue = queryParams.get('year')

  const { data, isLoading, isSuccess } = useSearchMoviesQuery({
    title: searchValue,
    year: yearValue ? yearValue : ''
  })

  useEffect(() => {
    isSuccess && data.Response === 'True' && setMovies(data.Search)
    // console.log(data)
  }, [isSuccess, data])

  const [currentPage, setCurrentPage] = useState(1)
  const moviesPerPage = 5
  const totalPages = Math.ceil(movies?.length / moviesPerPage)
  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const searchHandler = () => {
    navigate(`?search=${searchTermRef.current.value}`)
    searchTermRef.current.value = ''
  }

  const searchByYearHandler = () => {
    navigate(`?search=${searchValue}&year=${yearInpRef.current.value}`)
  }

  const addToFavouriteHandler = movie => {
    dispatch(favouritesActions.addMovieToFavourite(movie))
  }

  const sortByYearChangeHandler = async () => {
    setSortByYear(prev => !prev)

    // Is it the right way?
    // setSortByYear(prev=>{
    //   console.log(prev)
    //   if(!prev){
    //     const sortedMovieList = [...movies].sort((curr,next) => curr.Year - next.Year)
    //     setMovies(sortedMovieList)
    //   }
    //   return !prev
    // })

    if (!sortByYear) {
      // It's logically incorrect please tell me the right way to do this
      const sortedMovieList = [...movies].sort(
        (curr, next) => curr.Year - next.Year
      )
      setMovies(sortedMovieList)
    }
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
          Search by Year :
          <input
            type='number'
            // onChange={searchByYearHandler}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                searchByYearHandler()
              }
            }}
            className={classes.searchInput}
            ref={yearInpRef}
          />
          <button className={classes.searchButton} onClick={searchByYearHandler}>
            Click
          </button>
        </label>
      </div>
      <h2>Search Results for "{searchValue} ({`for year ${yearValue ? yearValue : 'NA'}`})"</h2>
      {isLoading && <p>Loading...</p>}
      {data?.Error && <p>{data.Error}</p>}
      {isSuccess &&
        currentMovies.map(item => (
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
