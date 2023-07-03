import React from 'react'
import classes from './MovieItem.module.css'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {favouritesActions} from '../slice/favourites-slice'

const MovieItem = props => {
  const dispatch = useDispatch()
  const favouriteHandler = () => {
    if(!props.item.favourite){
      dispatch(favouritesActions.addMovieToFavourite({
        Title:props.item.Title,
        Year:props.item.Year,
        imdbID:props.item.imdbID,
        Type:props.item.Type,
        Poster:props.item.Poster
      }))
    }
    if(props.item.favourite){
      dispatch(favouritesActions.removeMovieFromFavourite(props.item.imdbID))
    }
  }
	const navigate = useNavigate()
  const itemClickHandler = () => {
		navigate(`/${props.item.imdbID}`)
	}

  return (
    <div className={classes.movieItem} data-testid={props['data-testid']}>
      <img
        data-testid="poster"
        src={props.item.Poster}
        alt={props.item.Title}
        className={classes.poster}
      />
      <div className={classes.details} onClick={itemClickHandler} data-testid="container">
        <h2 className={classes.title} data-testid="title">{props.item.Title}</h2>
        <p className={classes.year} data-testid="year">{props.item.Year}</p>
      </div>
      <button
        className={`${classes.favBtn} ${!props.item.favourite ? classes.addToFav : classes.removeFav}`}
        onClick={favouriteHandler}
        data-testid="btnFav"
      >
        {props.item.favourite ? 'Remove Favourite' : 'Add To Favourite'}
      </button>
    </div>
  )
}

export default MovieItem