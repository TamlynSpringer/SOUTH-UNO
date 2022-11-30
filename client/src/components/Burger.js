import React, { useState, useEffect } from 'react';
import './Burger.css';
import Navbar from './Navbar';
import { southLogo } from '../utils/SouthLogo';
import { Link } from "react-router-dom";


const Burger = () => {

  const [open, setOpen ] = useState(false);
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");


  useEffect(() => {
    if (!open) {
      setBurgerClass("burger-bar unclicked")
    }
      },[]);

   const updateMenu = () =>{
    if(!open){
     setBurgerClass("burger-bar clicked")
   }else{
   setBurgerClass("burger-bar unclicked")
   }
   setOpen(!open)
  }

  return (
    <nav className='nav'>
      <Link to=''>
        <div className='south-logo'>{southLogo}</div>
      </Link>
       <div className='burger_menu' open={open} onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
      </div>
      <Navbar open={open}/>
    </nav>
  )
}

export default Burger
