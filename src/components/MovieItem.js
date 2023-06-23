import React from 'react'
import classes from './MovieItem.module.css'
import {useNavigate} from 'react-router-dom'

const MovieItem = props => {
  const favouriteHandler = () => {
    if(props.type === 'add'){
      props.onAdd(props.item)
    }
    if(props.type === 'remove'){
      props.onRemove(props.item.imdbID)
    }
  }
	const navigate = useNavigate()
  const itemClickHandler = () => {
		navigate(`/${props.item.imdbID}`)
	}

  return (
    <div className={classes.movieItem}>
      <img
        src={props.item.Poster}
        alt={props.item.Title}
        className={classes.poster}
      />
      <div className={classes.details} onClick={itemClickHandler}>
        <h2 className={classes.title}>{props.item.Title}</h2>
        <p className={classes.year}>{props.item.Year}</p>
      </div>
      <button
        className={classes.addToFavorites}
        onClick={favouriteHandler}
      >
        {props.name}
      </button>
    </div>
  )
}

export default MovieItem
