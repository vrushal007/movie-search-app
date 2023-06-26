import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSearchMovieByIdQuery } from '../api/movieApi'

import classes from './MovieDetail.module.css'
import DoesNotExist from './DoesNotExist'

function MovieDetail () {
  const { id } = useParams()
  const { data: movie, isLoading, isSuccess, isError, error } = useSearchMovieByIdQuery(id)
  const navigate = useNavigate()
  const backToHomeHandler = () => {
    navigate('/')
  }
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something wrong. {error.error}</p>}
      {isSuccess && movie.Response === 'False' && <DoesNotExist />}
      {isSuccess && movie.Response === 'True' && (
        <div className={classes.movieDetailContainer}>
          <div className={classes.rowContainer}>
            <div className={classes.posterContainer}>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className={classes.detailsContainer}>
              <div className={classes.row}>
                <span className={classes.label}>Title:</span>
                <span className={classes.value}>{movie.Title}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Year:</span>
                <span className={classes.value}>{movie.Year}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Rated:</span>
                <span className={classes.value}>{movie.Rated}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Released:</span>
                <span className={classes.value}>{movie.Released}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Runtime:</span>
                <span className={classes.value}>{movie.Runtime}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Genre:</span>
                <span className={classes.value}>{movie.Genre}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Director:</span>
                <span className={classes.value}>{movie.Director}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Writer:</span>
                <span className={classes.value}>{movie.Writer}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Actors:</span>
                <span className={classes.value}>{movie.Actors}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Language:</span>
                <span className={classes.value}>{movie.Language}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>Country:</span>
                <span className={classes.value}>{movie.Country}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>IMDb Rating:</span>
                <span className={classes.value}>{movie.imdbRating}</span>
              </div>
              <div className={classes.row}>
                <span className={classes.label}>IMDb Votes:</span>
                <span className={classes.value}>{movie.imdbVotes}</span>
              </div>
            </div>
          </div>
          <div className={classes.detailsContainer}>
            <div className={classes.row}>
              <span className={classes.label}>Description:</span>
              <span className={classes.value}>{movie.Plot}</span>
            </div>
            <div className={classes.row}>
              <span className={classes.label}>Awards:</span>
              <span className={classes.value}>{movie.Awards}</span>
            </div>
            <div className={classes.row}>
              <span className={classes.label}>Ratings:</span>
              <div className={classes.value}>
                {movie.Ratings?.map(rating => (
                  <div key={rating.Source}>
                    {rating.Source}: {rating.Value}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className={classes.button} onClick={backToHomeHandler}>Back to Home</button>
        </div>
      )}
    </div>
  )
}

export default MovieDetail
