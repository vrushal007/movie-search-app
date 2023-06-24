import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'

function Header() {
  return (<header className={classes.header}>
    <div className={classes.logo}>Movie App</div>
    <nav className={classes.nav}>
        <ul>
            <li>
                <NavLink to='/' className={({isActive})=> isActive ? classes.active : undefined}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to='/favourites' className={({isActive})=> isActive ? classes.active : undefined}>
                    Favourite
                </NavLink>
            </li>
        </ul>
    </nav>
  </header>
  )
}

export default Header