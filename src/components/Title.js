import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Snackbar } from "./Snackbar";

const Title = ({ loggedIn, setLoggedIn, message, setMessage, setMyCart, setToken, setGuestCart }) => {

  const history = useHistory();

    const Logout = () => {
    setLoggedIn(null);
    setMyCart(null);
    setToken(null);
    setMessage("You have successfully logged out")
    Snackbar()
    
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push('/');
  }

  return <div id='site-title'>
    <div id='title'>
      <h1>Popped Perfection</h1>
    </div>
    <div id='navbar'>
      <Link className='navlink' to="/">Home</Link>
      <Link className='navlink'to="/products">Products</Link>
      {loggedIn? <Link className='navlink' to="/account">My Orders</Link> : <Link className='navlink' to="/login">Login</Link>}
      {loggedIn? <Link className='navlink' to="/" onClick={Logout}>Logout</Link> : <Link className='navlink' to="/register">Register</Link>}
      <Link className='navlink' to="/cart">Cart</Link>
    </div>
    <div id='snackbar'>{message}</div>
  </div>
};

export default Title;


