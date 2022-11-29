import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = ({open, SetOpen}) => {
 


  return (
        <ul className={ open? 'nav__display' : 'nav__hide'}>
          <Link to='login' className="header__links">
          <li onClick={()=> SetOpen(false)}>Join</li>
          </Link>
          <Link to='rules' className='header__links'>
          <li onClick={()=> SetOpen(false)}>Rules</li>
          </Link>
          <Link to='scoreboard' className='header__links'>
          <li onClick={()=> SetOpen(false)}>Scoreboard</li>
          </Link>
          <Link to='about' className='header__links'>
          <li onClick={()=> SetOpen(false)}>About</li>
          </Link>
        </ul>
  )
}

export default Navbar