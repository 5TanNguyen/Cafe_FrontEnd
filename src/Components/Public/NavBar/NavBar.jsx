import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import {useSelector} from "react-redux";
import "./navbar.css";
// import Logout from "../Logout/Logout";
const NavBar = () => {
  // const user = useSelector((state)=> state.auth.logi);
  const [customer,setCustomer] = useState(null);
  const [token, setToken] = useState();
  const [cId, setCId] = useState();
  const [cName, setCName] = useState();
  const [uName, setUName] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setCName(localStorage.getItem('name'));
    setUName(localStorage.getItem('userName'));
    setCId(localStorage.getItem('id'));
  }, [])

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {cName? (
        <>
        <p className="navbar-user">Hi, <span> {cName}  </span> </p>
        <Link to="/products" className="navbar-login"> Products </Link>
        {/* <Logout /> */}
        </>
      ) : (    
        <>
        </>
      )}

      {uName? (
        <>
        <p className="navbar-user">Hi, <span> {uName}  </span> </p>
        <Link to="/user/products" className="navbar-login"> Products </Link>
        <Link to="/user" className="navbar-login"> Users </Link>
        <Link to="/order" className="navbar-home"> Order </Link>
        {/* <Logout /> */}
        </>
      ) : (    
        <>
        </>
      )}

      { (!uName && !cName) ? (
        <>
        <Link to="/products" className="navbar-login"> Products </Link>
        <Link to="/login" className="navbar-login"> Login </Link>
        <Link to="/register" className="navbar-register"> Register</Link>
        </>
        ) : (    
          <>
          </>
        )}
    </nav>
  );
};

export default NavBar;
