import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useLocation } from 'react-router-dom'
import Home from '../components/Home'
import { useSearchMoviesQuery } from '../api/movieApi'
import { useSelector } from 'react-redux'

jest.mock('@reduxjs/toolkit')

jest.mock('../api/movieApi', () => ({
  useSearchMoviesQuery: jest.fn(),
  useSearchMovieByIdQuery: jest.fn()
}))

jest.mock('../slice/favourites-slice', () => ({
  favouritesActions: {
    addMovieToFavourite: jest.fn(),
    removeMovieFromFavourite: jest.fn()
  }
}))
jest.mock('../slice/search-slice', () => ({
  searchActions: {
    updateMoviesList: jest.fn()
  }
}))

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn()
}))

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))

const movies = [
  {
    Title: 'The Fast and the Furious',
    Year: '2001',
    imdbID: 'tt0232500',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  {
    Title: 'Fast Five',
    Year: '2011',
    imdbID: 'tt1596343',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_SX300.jpg'
  },
  {
    Title: 'Fast & Furious',
    Year: '2009',
    imdbID: 'tt1013752',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYjQ1ZTMxNzgtZDcxOC00NWY5LTk3ZjAtYzRhMDhlNDZlOWEzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    Title: '2 Fast 2 Furious',
    Year: '2003',
    imdbID: 'tt0322259',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMzExYjcyYWMtY2JkOC00NDUwLTg2OTgtMDI3MGY2OWQzMDE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
  },
  {
    Title: 'The Fast and the Furious: Tokyo Drift',
    Year: '2006',
    imdbID: 'tt0463985',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg'
  },
  {
    Title: 'Fast & Furious Presents: Hobbs & Shaw',
    Year: '2019',
    imdbID: 'tt6806448',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTIzYmUyMmEtMWQzNC00YzExLTk3MzYtZTUzYjMyMmRiYzIwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg'
  },
  {
    Title: 'F9: The Fast Saga',
    Year: '2021',
    imdbID: 'tt5433138',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjI0NmFkYzEtNzU2YS00NTg5LWIwYmMtNmQ1MTU0OGJjOTMxXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg'
  },
  {
    Title: 'Fast Times at Ridgemont High',
    Year: '1982',
    imdbID: 'tt0083929',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYzBlZjE1MDctYjZmZC00ZTJmLWFkOWEtYjdmZDZkODBkZmI2XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg'
  },
  {
    Title: 'Fast X',
    Year: '2023',
    imdbID: 'tt5433140',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzZmOTU1ZTEtYzVhNi00NzQxLWI5ZjAtNWNhNjEwY2E3YmZjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
  }
]

describe('Home', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    jest.requireMock('react-redux').useDispatch = () => mockDispatch
    useLocation.mockReturnValue({ search: '' })
  })

  //test case-1 *************************
  it('renders correctly', () => {
    useSearchMoviesQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null
    })

    useSelector.mockImplementation(state =>
      state({
        search: {
          movies: []
        },
        favourite: {
          movies: []
        }
      })
    )

    render(<Home />)
    const searchBar = screen.getByTestId('searchBar')
    const searchBtn = screen.getByTestId('searchBtn')
    const loading = screen.getByTestId('loading')
    const sortByYrChkBox = screen.getByTestId('sortByYrChkBox')
    const sortByTitleChkBox = screen.getByTestId('sortByTitleChkBox')
    const searchByTitleInp = screen.getByTestId('searchByTitleInp')
    const searchByYrBtn = screen.getByTestId('searchByYrBtn')

    expect(sortByTitleChkBox).not.toBeDisabled()
    expect(sortByYrChkBox).not.toBeDisabled()
    expect(sortByTitleChkBox).not.toBeChecked()
    expect(sortByYrChkBox).not.toBeChecked()
    expect(searchByTitleInp).toBeDisabled()
    expect(searchByYrBtn).toBeDisabled()
    expect(loading).toBeInTheDocument()
    expect(searchBar).toBeInTheDocument()
    expect(searchBtn).toBeInTheDocument()
  })

  //test-case2 **************************
  it('render fetchError elements', () => {
    useSearchMoviesQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: { error: 'Failed to fetch' }
    })

    useSelector.mockImplementation(state =>
      state({
        search: {
          movies: []
        },
        favourite: {
          movies: []
        }
      })
    )

    render(<Home />)

    const fetchError = screen.getByTestId('fetchError')

    expect(fetchError).toHaveTextContent(/Failed to fetch/i)
    expect(fetchError).toBeInTheDocument()
  })

  //test-case3 **************************
  it('render api error elements', () => {
    useSearchMoviesQuery.mockReturnValue({
      data: { Response: 'False', Error: 'Incorrect IMDb ID.' },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    useSelector.mockImplementation(state =>
      state({
        search: {
          movies: []
        },
        favourite: {
          movies: []
        }
      })
    )

    render(<Home />)

    const apiResponseError = screen.getByTestId('apiResponseError')
    expect(apiResponseError).toBeInTheDocument()
    expect(apiResponseError).toHaveTextContent(/Incorrect IMDb ID./i)
  })

  //test-case4**************************
  it('Api response false and render api err element', () => {
    useSearchMoviesQuery.mockReturnValue({
      data: { Response: 'False', Error: 'Incorrect IMDb ID.' },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    useSelector.mockImplementation(state =>
      state({
        search: {
          movies: []
        },
        favourite: {
          movies: []
        }
      })
    )

    render(<Home />)

    const apiResponseError = screen.getByTestId('apiResponseError')
    expect(apiResponseError).toBeInTheDocument()
    expect(apiResponseError).toHaveTextContent(/Incorrect IMDb ID./i)
  })

  //test-case5**************************
  it('rendering main component correctly', () => {
    useSearchMoviesQuery.mockReturnValue({
      data: {
        Search: [
          {
            Title: 'Fast & Furious 6',
            Year: '2013',
            imdbID: 'tt1905041',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg'
          },
          {
            Title: 'The Fast and the Furious',
            Year: '2001',
            imdbID: 'tt0232500',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
          },
          {
            Title: 'Fast Five',
            Year: '2011',
            imdbID: 'tt1596343',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_SX300.jpg'
          },
          {
            Title: 'Fast & Furious',
            Year: '2009',
            imdbID: 'tt1013752',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BYjQ1ZTMxNzgtZDcxOC00NWY5LTk3ZjAtYzRhMDhlNDZlOWEzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
          },
          {
            Title: '2 Fast 2 Furious',
            Year: '2003',
            imdbID: 'tt0322259',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BMzExYjcyYWMtY2JkOC00NDUwLTg2OTgtMDI3MGY2OWQzMDE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
          },
          {
            Title: 'The Fast and the Furious: Tokyo Drift',
            Year: '2006',
            imdbID: 'tt0463985',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg'
          },
          {
            Title: 'Fast & Furious Presents: Hobbs & Shaw',
            Year: '2019',
            imdbID: 'tt6806448',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BOTIzYmUyMmEtMWQzNC00YzExLTk3MzYtZTUzYjMyMmRiYzIwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg'
          },
          {
            Title: 'F9: The Fast Saga',
            Year: '2021',
            imdbID: 'tt5433138',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BMjI0NmFkYzEtNzU2YS00NTg5LWIwYmMtNmQ1MTU0OGJjOTMxXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg'
          },
          {
            Title: 'Fast Times at Ridgemont High',
            Year: '1982',
            imdbID: 'tt0083929',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BYzBlZjE1MDctYjZmZC00ZTJmLWFkOWEtYjdmZDZkODBkZmI2XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg'
          },
          {
            Title: 'Fast X',
            Year: '2023',
            imdbID: 'tt5433140',
            Type: 'movie',
            Poster:
              'https://m.media-amazon.com/images/M/MV5BNzZmOTU1ZTEtYzVhNi00NzQxLWI5ZjAtNWNhNjEwY2E3YmZjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
          }
        ],
        totalResults: '856',
        Response: 'True'
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    useSelector.mockImplementation(state =>
      state({
        search: {
          movies: [
            {
              Title: 'Fast & Furious 6',
              Year: '2013',
              imdbID: 'tt1905041',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg'
            },
            {
              Title: 'The Fast and the Furious',
              Year: '2001',
              imdbID: 'tt0232500',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
            },
            {
              Title: 'Fast Five',
              Year: '2011',
              imdbID: 'tt1596343',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_SX300.jpg'
            },
            {
              Title: 'Fast & Furious',
              Year: '2009',
              imdbID: 'tt1013752',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BYjQ1ZTMxNzgtZDcxOC00NWY5LTk3ZjAtYzRhMDhlNDZlOWEzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
            },
            {
              Title: '2 Fast 2 Furious',
              Year: '2003',
              imdbID: 'tt0322259',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMzExYjcyYWMtY2JkOC00NDUwLTg2OTgtMDI3MGY2OWQzMDE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
            },
            {
              Title: 'The Fast and the Furious: Tokyo Drift',
              Year: '2006',
              imdbID: 'tt0463985',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg'
            },
            {
              Title: 'Fast & Furious Presents: Hobbs & Shaw',
              Year: '2019',
              imdbID: 'tt6806448',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BOTIzYmUyMmEtMWQzNC00YzExLTk3MzYtZTUzYjMyMmRiYzIwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg'
            },
            {
              Title: 'F9: The Fast Saga',
              Year: '2021',
              imdbID: 'tt5433138',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BMjI0NmFkYzEtNzU2YS00NTg5LWIwYmMtNmQ1MTU0OGJjOTMxXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg'
            },
            {
              Title: 'Fast Times at Ridgemont High',
              Year: '1982',
              imdbID: 'tt0083929',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BYzBlZjE1MDctYjZmZC00ZTJmLWFkOWEtYjdmZDZkODBkZmI2XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg'
            },
            {
              Title: 'Fast X',
              Year: '2023',
              imdbID: 'tt5433140',
              Type: 'movie',
              Poster:
                'https://m.media-amazon.com/images/M/MV5BNzZmOTU1ZTEtYzVhNi00NzQxLWI5ZjAtNWNhNjEwY2E3YmZjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
            }
          ]
        },
        favourite: {
          movies: []
        }
      })
    )

    render(<Home />)

    const singleMovie = screen.getAllByTestId('singleMovie')
    expect(singleMovie).toHaveLength(5)
  })

  //test-case6**************************
  it('check search button click works properly', () => {
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate

    useSearchMoviesQuery.mockReturnValue({
      data: {
        Search: movies,
        totalResults: '856',
        Response: 'True'
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    useSelector.mockImplementation(state =>
      state({
        search: {
          movies
        },
        favourite: {
          movies: []
        }
      })
    )

    render(<Home />)

    const searchBar = screen.getByTestId('searchBar')
    const searchBtn = screen.getByTestId('searchBtn')
    const searchByTitleInp = screen.getByTestId('searchByTitleInp')
    const searchByYrBtn = screen.getByTestId('searchByYrBtn')

    expect(searchByTitleInp).toBeDisabled()
    expect(searchByYrBtn).toBeDisabled()
    fireEvent.change(searchBar, { target: { value: 'abc' } })
    fireEvent.click(searchBtn)
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('?search=abc')
  })

  //test-case7**************************
  it('check search year button click works properly', () => {
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate

    useLocation.mockReturnValue({ search: '?search=abc' })
    useSearchMoviesQuery.mockReturnValue({
      data: {
        Search: movies,
        totalResults: '856',
        Response: 'True'
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    useSelector.mockImplementation(state =>
      state({
        search: {
          movies
        },
        favourite: {
          movies: []
        }
      })
    )

    render(<Home />)

    const searchByTitleInp = screen.getByTestId('searchByTitleInp')
    const searchByYrBtn = screen.getByTestId('searchByYrBtn')

    fireEvent.change(searchByTitleInp, { target: { value: '2023' } })
    fireEvent.click(searchByYrBtn)

    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('?search=abc&year=2023')
  })

  //test-case8**************************
  it('toggle sort buttons in filters', () => {
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate

    useLocation.mockReturnValue({ search: '?search=abc' })

    useSearchMoviesQuery.mockReturnValue({
      data: {
        Search: movies,
        totalResults: '856',
        Response: 'True'
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    useSelector.mockImplementation(state =>
      state({
        search: {
          movies
        },
        favourite: {
          movies: []
        }
      })
    )

    render(<Home />)

    const sortByYrChkBox = screen.getByTestId('sortByYrChkBox')
    const sortByTitleChkBox = screen.getByTestId('sortByTitleChkBox')

    expect(sortByYrChkBox).not.toBeChecked()
    expect(sortByTitleChkBox).not.toBeChecked()

    fireEvent.click(sortByYrChkBox)

    expect(sortByYrChkBox).toBeChecked()
    expect(sortByTitleChkBox).not.toBeChecked()

    fireEvent.click(sortByTitleChkBox)

    expect(sortByYrChkBox).not.toBeChecked()
    expect(sortByTitleChkBox).toBeChecked()
  })

  //test-case9**************************
  it('check no of pagination buttons', () => {
    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate

    useLocation.mockReturnValue({ search: '?search=abc' })

    useSearchMoviesQuery.mockReturnValue({
      data: {
        Search: movies,
        totalResults: '856',
        Response: 'True'
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    })

    useSelector.mockImplementation(state =>
      state({
        search: {
          movies
        },
        favourite: {
          movies: []
        }
      })
    )

    render(<Home />)
		
		const btnPage = screen.getAllByTestId('btnPage')
		
		expect(btnPage).toHaveLength(Math.ceil(movies.length / 5))
  })
})