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

  const handleHamburger = () => {
    const navUL = document.getElementById('nav-ul');
    navUL.classList.toggle('show');
}

  return <div id='site-title'>
    <nav>
      {/* <div id='title'> */}
        <h1><b>Popped Perfection</b></h1>
      {/* </div> */}
      {/* <div id='navbar'> */}
      <button className="hamburger" id="hamburger" onClick={handleHamburger}>
      <i className="fa fa-bars"></i>
      </button>
        <ul className="nav-ul" id="nav-ul">
          <li><Link className='navlink' to="/">Home</Link></li>
          <li><Link className='navlink'to="/products">Products</Link></li>
          <li>{loggedIn? <Link className='navlink' to="/account">My Account</Link> : <Link className='navlink' to="/login">Login</Link>}</li>
          <li>{loggedIn? <Link className='navlink' to="/" onClick={Logout}>Logout</Link> : <Link className='navlink' to="/register">Register</Link>}</li>
          <li><Link className='navlink' to="/cart">Cart</Link></li>
          <li>{loggedIn && (loggedIn.isAdmin === true) ? <Link className='navlink' to='/admin'>Admin</Link> : null}</li>
        </ul>
      {/* </div> */}
      <div id='snackbar'>{message}</div>
    </nav>
  </div>
};

export default Title;


