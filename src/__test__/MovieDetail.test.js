import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { useSearchMovieByIdQuery } from '../api/movieApi'
import MovieDetail from '../components/MovieDetail'
import '@testing-library/jest-dom'


jest.mock('../api/movieApi', () => ({
  useSearchMovieByIdQuery: jest.fn()
}))

jest.mock('react-router-dom',()=>({
    useNavigate: jest.fn(),
    useParams:  () => ({ id: 'tt1905041' })
}))

const movie = {
  Title: 'Fast & Furious 6',
  Year: '2013',
  Rated: 'PG-13',
  Released: '24 May 2013',
  Runtime: '130 min',
  Genre: 'Action, Adventure, Crime',
  Director: 'Justin Lin',
  Writer: 'Chris Morgan, Gary Scott Thompson',
  Actors: 'Vin Diesel, Paul Walker, Dwayne Johnson',
  Plot: 'Hobbs has Dominic and Brian reassemble their crew to take down a team of mercenaries: Dominic unexpectedly gets sidetracked with facing his presumed deceased girlfriend, Letty.',
  Language:
    'English, Spanish, Russian, Japanese, Cantonese, Dutch, Danish, Ukrainian',
  Country: 'United States, Japan, Spain, United Kingdom',
  Awards: '11 wins & 22 nominations',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '7.0/10' },
    { Source: 'Rotten Tomatoes', Value: '71%' },
    { Source: 'Metacritic', Value: '61/100' }
  ],
  Metascore: '61',
  imdbRating: '7.0',
  imdbVotes: '404,246',
  imdbID: 'tt1905041',
  Type: 'movie',
  DVD: '29 Oct 2013',
  BoxOffice: '$238,679,850',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True'
}

describe('MovieDetail', () => {
  it('renders loading state correctly', () => {
    useSearchMovieByIdQuery.mockReturnValue({
        data: undefined,
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
      });
  
  
    render(<MovieDetail />)

    const loading = screen.getByTestId('loading')
    const backBtn = screen.getByTestId('backBtn')
    
    expect(loading).toBeInTheDocument()
    expect(backBtn).toBeInTheDocument()

})
  it('renders error state correctly',()=>{

    useSearchMovieByIdQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: {error:'Failed to fetch'},
    });
    render(<MovieDetail />)

    const error = screen.getByTestId('error')
    const backBtn = screen.getByTestId('backBtn')


    expect(error).toBeInTheDocument()
    expect(backBtn).toBeInTheDocument()
    expect(error).toHaveTextContent(/Something wrong. Failed to fetch/i)
  })

  it("render main component correctly",()=>{

    useSearchMovieByIdQuery.mockReturnValue({
        data: movie,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null
    });
    render(<MovieDetail />)
    
    const rating = screen.getAllByTestId('rating')
    const backBtn = screen.getByTestId('backBtn')

    expect(rating).toHaveLength(3)
    expect(backBtn).toBeInTheDocument()
    
  })

  it("navigate to home page when click on back to home button",()=>{

    const mockNavigate = jest.fn()
    jest.requireMock('react-router-dom').useNavigate = () => mockNavigate


    useSearchMovieByIdQuery.mockReturnValue({
        data: movie,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null
    });

    render(<MovieDetail />)
    
    const backBtn = screen.getByTestId('backBtn')

    fireEvent.click(backBtn)

    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/')
    
  })

})
