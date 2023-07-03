import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../components/Header'
import '@testing-library/jest-dom'

// jest.mock('react-router-dom',()=>({
//     useLocation: jest.fn()
// }))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({
    pathname: '/'
  }))
}))

describe('Header Comp', () => {
  it('renders the logo correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const logo = screen.getByText('Movie App')
    expect(logo).toBeInTheDocument()
  })

  it('checking header elements present', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    const Home = screen.getByText(/Home/i)
    const Favourite = screen.getByText(/Favourite/i)

    expect(Home).toBeInTheDocument()
    expect(Favourite).toBeInTheDocument()
  })

	it('checking isActive class of nav elements',()=>{
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		)
		
		const homeLink = screen.getByText(/Home/)
		const favLink = screen.getByText(/Favourite/)

		expect(homeLink).toHaveClass('active')
		expect(favLink).not.toHaveClass('active')

		fireEvent.click(favLink)

		expect(favLink).toHaveClass('active')
		expect(homeLink).not.toHaveClass('active')

	})
})
