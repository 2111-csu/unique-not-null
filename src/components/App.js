import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { callApi } from "../axios-services";
import {
  Admin,
  Header,
  Home,
  Payment,
  AllProducts,
  SingleProduct,
  SingleOrder,
  SingleUser,
  Login,
  Register,
  User,
  Title,
  Cart,
  Checkout
} from "./";
import "../style/App.css";

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const userAuth = JSON.parse(localStorage.getItem("user"));
  const userToken = JSON.parse(localStorage.getItem("token"));
  const guestCart = JSON.parse(localStorage.getItem("guestCart"));
  const [token, setToken] = useState(userToken);
  const [loggedIn, setLoggedIn] = useState(userAuth);
  const [message, setMessage] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(guestCart);
  const [myCart, setMyCart] = useState([]);

  useEffect(() => {
    const getAPIStatus = async () => {
      const healthy = await callApi({ url: "/api/health", method: "GET" });
      setAPIHealth(healthy ? "api is up! OK" : "api is down :/");
    };

   const getCart = async () => {
      const userCart = await callApi({
        url: '/api/orders/cart',
        token,
        method: 'GET'
      });

      console.log('userCart', userCart.data);
      setMyCart(userCart.data[0]);
    } 
    getAPIStatus();
    getCart();

  }, []); 

  
  return (
    <>
      <div className="app-container">
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
      </div>

      <div className="app-container">
        <Title
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          message={message}
          setMessage={setMessage}
        />
        <Route exact path="/">
          {/* <Home /> */}
        </Route>

        <Route exact path="/admin">
          {/* <Admin /> need state for inventory here */}
        </Route>

        <Route exact path="/account">
          <SingleUser 
            token={token} 
            loggedIn={loggedIn} 
          />
        </Route>

        <Route exact path="/cart">
          <Cart 
            token={token} 
            myCart={myCart} 
            setMyCart={setMyCart}
          />
        </Route>

        <Route exact path="/cart/checkout">
          <Checkout token={token} myCart={myCart} message={message} />
        </Route>

        <Route exact path="/login">
          <Login
            setLoggedIn={setLoggedIn}
            setToken={setToken}
            setMessage={setMessage}
          />
        </Route>

        <Route exact path="/products">
          <AllProducts 
            products={products} 
            setProducts={setProducts}
            myCart={myCart} 
          />
        </Route>

        <Route exact path="/products/:productId">
          <SingleProduct 
            products={products} 
          />
        </Route>

        <Route exact path="/register">
          <Register 
            setToken={setToken} 
            setMessage={setMessage}
          />
        </Route>

        <Route exact path="/orders/:orderId">
          <SingleOrder 
            orders={orders} 
            setOrders={setOrders} 
            token={token}
          />
        </Route>
      </div>
    </>
  );
};

export default App;