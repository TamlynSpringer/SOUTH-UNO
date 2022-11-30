import React, { useState, useEffect } from 'react';
import './Burger.css';
import Navbar from './Navbar';
import { southLogo } from '../utils/SouthLogo';



const Burger = () => {

  const [open, SetOpen ] = useState(false);
  const [burger_class, SetBurgerclass] = useState("burger-bar unclicked");


  useEffect(() => {
    if (!open) {
      SetBurgerclass("burger-bar unclicked")
    }
      },[]);



   const updateMenu = () =>{
    if(!open){
     SetBurgerclass("burger-bar clicked")
   }else{
   SetBurgerclass("burger-bar unclicked")
   }
   SetOpen(!open)
  }


  return (
    <nav className='nav'>
       <div className='south-logo'>{southLogo}</div>
       <div className='burger_menu' open={open} SetOpen={SetOpen} onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
      </div>
      <Navbar open={open}/>
    </nav>
  )
}

export default Burger
