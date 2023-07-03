import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieItem from './MovieItem'
import { favouritesActions } from '../slice/favourites-slice'
import classes from './Favourites.module.css'

function Favourites () {
  const favouriteMovies = useSelector(state => state.favourite.movies)
  const dispatch = useDispatch()
  // console.log(favouriteMovies)

  const removeFavouriteHandler = id => {
    dispatch(favouritesActions.removeMovieFromFavourite(id))
  }

  return (
    <div className={classes.favourite}>
      {favouriteMovies.length === 0 && <p data-testid="noMovie">No favourite movies added.</p>}
      {favouriteMovies.length >= 0 && favouriteMovies?.map(item => (
        <MovieItem
          data-testid="favMovie"
          key={item.imdbID}
          item={{ ...item, favourite: true }}
          onRemove={removeFavouriteHandler}
          type='remove'
        />
      ))}
    </div>
  )
}

export default Favourites
