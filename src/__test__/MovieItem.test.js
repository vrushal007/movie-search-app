import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import { favouritesActions } from '../slice/favourites-slice'
import MovieItem from '../components/MovieItem'
import '@testing-library/jest-dom'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

jest.mock('../slice/favourites-slice', () => ({
  favouritesActions: {
    addMovieToFavourite: jest.fn(),
    removeMovieFromFavourite: jest.fn()
  }
}))

describe('MovieItem', () => {
  const mockDispatch = jest.fn()
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch)
  })
  const movie = {
    Title: 'Test Movie',
    Year: '2023',
    imdbID: 'test-imdb-id',
    Type: 'movie',
    Poster: 'http://example.com/poster.jpg',
    favourite: false
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    render(<MovieItem item={{...movie,favourite:false}} />)
    const posterElement = screen.getByTestId('poster')
    const titleElement = screen.getByTestId('title')
    const yearElement = screen.getByTestId('year')
    const buttonElement = screen.getByTestId('btnFav')

    expect(posterElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('Test Movie')
    expect(yearElement).toHaveTextContent('2023')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent('Add To Favourite')
    expect(buttonElement).toHaveClass('addToFav')
  })

  it('dispatches addMovieToFavourite when the "Add To Favourite" button is clicked', () => {
    render(<MovieItem item={movie} />)
    const buttonElement = screen.getByTestId('btnFav')

    fireEvent.click(buttonElement)
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(favouritesActions.addMovieToFavourite).toHaveBeenCalledWith({
        Title: 'Test Movie',
        Year: '2023',
        imdbID: 'test-imdb-id',
        Type: 'movie',
        Poster: 'http://example.com/poster.jpg'
    })
  })

  it('dispatches removeMovieFromFavourite when the "Remove Favourite" button is clicked', () => {
    render(<MovieItem item={{ ...movie, favourite: true }} />)
    const buttonElement = screen.getByTestId('btnFav')

    fireEvent.click(buttonElement)

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(favouritesActions.removeMovieFromFavourite).toHaveBeenCalledWith(
      'test-imdb-id'
    )
  })

  it('navigates to the movie details page when the container is clicked', () => {
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate;

    render(<MovieItem item={movie} />)
    const containerElement = screen.getByTestId('container')

    fireEvent.click(containerElement)

    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/test-imdb-id')
  })
})
