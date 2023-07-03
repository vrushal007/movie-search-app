import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useDispatch, useSelector } from 'react-redux'
import Favourites from '../components/Favourites'

jest.mock('../slice/favourites-slice')

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}))

jest.mock('react-router-dom',()=>({
    useNavigate:jest.fn()
}))

const movies = [
  {
    favourite:true,
    Title: 'Fast & Furious 6',
    Year: '2013',
    imdbID: 'tt1905041',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg'
  },
  {
    favourite:true,
    Title: 'The Fast and the Furious',
    Year: '2001',
    imdbID: 'tt0232500',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  {
    favourite:true,
    Title: 'Fast Five',
    Year: '2011',
    imdbID: 'tt1596343',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_SX300.jpg'
  },
  {
    favourite:true,
    Title: '2 Fast 2 Furious',
    Year: '2003',
    imdbID: 'tt0322259',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMzExYjcyYWMtY2JkOC00NDUwLTg2OTgtMDI3MGY2OWQzMDE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
  }
]

describe('Favourite Comp', () => {
  const mockDispatch = jest.fn()
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch)
  })

  it('render empty movies correctly', () => {
    useSelector.mockImplementation(state =>
      state({
        favourite: {
          movies: []
        }
      })
    )
    render(<Favourites />)
    const noMovie = screen.getByTestId('noMovie')

    expect(noMovie).toBeInTheDocument()
  })

  it('render favourite movies correctly', () => {
    useSelector.mockImplementation(state =>
      state({
        favourite: {
          movies
        }
      })
    )
    render(<Favourites />)
    const favMovies = screen.getAllByTestId('favMovie')
    expect(favMovies).toHaveLength(4)

  })
})
