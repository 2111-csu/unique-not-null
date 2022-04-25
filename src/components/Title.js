import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Snackbar } from "./Snackbar";

const Title = ({ loggedIn, setLoggedIn, message, setMessage }) => {

  const history = useHistory();

    const Logout = () => {
    setLoggedIn(null);
    setMessage("You have successfully logged out")
    Snackbar()
    localStorage.clear();
    history.push('/');
  }

  return <div id='site-title'>
    <div>
      <h1>Popcorn Perfection</h1>
    </div>
    <div id='navbar'>
      <Link className='navlink' to="/">Home</Link>
      <Link className='navlink'to="/products">Products</Link>
      {loggedIn? <Link className='navlink' to="/">My Orders</Link> : <Link className='navlink' to="/login">Login</Link>}
      {loggedIn? <Link className='navlink' to="/" onClick={Logout}>Logout</Link> : <Link className='navlink' to="/register">Register</Link>}
    </div>
    <div id='message'>{message}</div>
  </div>
};

export default Title;


