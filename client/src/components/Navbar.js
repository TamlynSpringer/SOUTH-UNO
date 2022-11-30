import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";


 const Navbar = ({open}) => {

  return (
        <ul className={ open? 'nav__display' : 'nav__hide'}>
          <Link to='login' className="header__links">
          <li>Join</li>
          </Link>
          <Link to='rules' className='header__links'>
          <li>Rules</li>
          </Link>
          <Link to='scoreboard' className='header__links'>
          <li>Scoreboard</li>
          </Link>
          <Link to='about' className='header__links'>
          <li>About</li>
          </Link>
        </ul>
  )
}

export default Navbar;