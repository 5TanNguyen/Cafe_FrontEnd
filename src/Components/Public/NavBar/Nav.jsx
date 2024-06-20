import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./navbar.css";
import Logout from "../Logout/Logout";
import PopUp from '../PopUp/PopUp';
import Cart from '../../Customer/Cart/Cart';
import SearchInput from './SearchInput';

import io from "socket.io-client";
const socket = io.connect("http://localhost:5555");

const Nav = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [cToken, setCToken] = useState();
  const [cId, setCId] = useState();
  const [cName, setCName] = useState();

  useEffect(() => {
    setCToken(localStorage.getItem('customerToken'));
    setCName(localStorage.getItem('customerName'));
    setCId(localStorage.getItem('customerId'));

    socket.emit("join_room", cId);
  }, [])

  return (
    <nav className='navBar'>
      <Link to="/" className='title'>HOME</Link>
      <div className="menuNavBar" 
           onClick={() =>{
            setMenuOpen(!menuOpen)
      }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {cName? (
          <>
          <li><SearchInput /></li>
          <li><NavLink to="/profile">Hi, {cName}</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><Cart socket={socket} customername={cName} room={cId}/></li>
          <li><Logout /></li>
        </>
        ) : (   
          <>
          </>
        )}
        { (!cName) ? (
          <>
          <li><SearchInput /></li>
          <li><NavLink to="/products" className="navbar-login"> Products </NavLink></li>
          <li><NavLink to="/login" className="navbar-login"> Login </NavLink></li>
          {/* <PopUp/> */}
          </>
        ) : (    
          <>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Nav
