import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";


 const Navbar = ({open, closing}) => {

  return (
        <ul className={ open? 'nav__display' : 'nav__hide'}>
          <Link to='login' className="header__links">
          <li onClick={closing}>Join</li>
          </Link>
          <Link to='rules' className='header__links'>
          <li onClick={closing}>Rules</li>
          </Link>
          <Link to='scoreboard' className='header__links'>
          <li onClick={closing}>Scoreboard</li>
          </Link>
          <Link to='about' className='header__links'>
          <li onClick={closing}>About</li>
          </Link>
        </ul>
  )
}

export default Navbar;