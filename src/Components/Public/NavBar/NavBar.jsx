import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import {useSelector} from "react-redux";
import "./navbar.css";
import Logout from "../Logout/Logout";
import PopUp from '../PopUp/PopUp';
import Cart from '../../Customer/Cart/Cart';

const NavBar = () => {
  // const user = useSelector((state)=> state.auth.logi);
  const [cToken, setCToken] = useState();
  const [cId, setCId] = useState();
  const [cName, setCName] = useState();

  useEffect(() => {
    setCToken(localStorage.getItem('customerToken'));
    setCName(localStorage.getItem('customerName'));
    setCId(localStorage.getItem('customerId'));
  }, [])

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {cName? (
        <>
        <p className="navbar-user">Hi, <span> {cName}  </span> </p>
        <Link to="/products" className="navbar-login"> Products </Link>
        <Cart/>
        <Logout />
        </>
      ) : (    
        <>
        </>
      )}

      {/* {uName? (
        <>
        <p className="navbar-user">Hi, <span> {uName}  </span> </p>
        <Link to="/user/products" className="navbar-login"> Products </Link>
        <Link to="/user" className="navbar-login"> Users </Link>
        <Link to="/order" className="navbar-home"> Order </Link>
        <Logout />
        </>
      ) : (    
        <>
        </>
      )} */}

      {/* { (!uName && !cName) ? ( */}
      { (!cName) ? (
        <>
        <Link to="/products" className="navbar-login"> Products </Link>
        <Link to="/login" className="navbar-login"> Login </Link>
        <Link to="/register" className="navbar-register"> Register</Link>
        {/* <PopUp/> */}
        </>
        ) : (    
          <>
          </>
        )}
    </nav>
  );
};

export default NavBar;
