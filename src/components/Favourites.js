import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MovieItem from './MovieItem'
import {favouritesActions} from '../slice/favourites-slice'

function Favourites() {
  const favouriteMovies = useSelector(state => state.favourite.movies)
	const dispatch = useDispatch()
	// console.log(favouriteMovies)

	const removeFavouriteHandler = (id) => {
		dispatch(favouritesActions.removeMovieFromFavourite(id))
	}

  return (
    <div>
			{favouriteMovies?.map((item)=><MovieItem item={item} name="Remove Favourite" onRemove={removeFavouriteHandler} type="remove"/>)}
    </div>
  )
}

export default Favourites