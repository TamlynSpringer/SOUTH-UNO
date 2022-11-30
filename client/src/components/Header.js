import React from 'react';
import { Link } from "react-router-dom";
import './Header.css'
import logo from '../assets/south-uno-logo.svg'

const Header = () => {
  return (
    <header className="header">
      <nav className='header__nav'>
        <Link to='' className='header__home'>
           <img className="logo" src={logo} alt="South Logo" />
        </Link>
        <div className='nav__links'>
          <Link to='login' className="header__links">
            <h2>Join</h2>
          </Link>
          <Link to='rules' className='header__links'>
          <h2>Rules</h2>
          </Link>
          <Link to='scoreboard' className='header__links'>
          <h2>Scoreboard</h2>
          </Link>
          <Link to='about' className='header__links'>
          <h2>About</h2>
          </Link> 
        </div>
      </nav>
  </header>
  )
};

export default Header;