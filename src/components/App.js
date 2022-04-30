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
  Cart
} from "./";
import "../style/App.css";

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const userAuth = JSON.parse(localStorage.getItem("user"));
  const userToken = JSON.parse(localStorage.getItem("token"));
  const [token, setToken] = useState(userToken);
  const [loggedIn, setLoggedIn] = useState(userAuth);
  const [message, setMessage] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [myCart, setMyCart] = useState([]);

/*original useEffect code*/
  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data

    const getAPIStatus = async () => {
      const healthy = await callApi({ url: "/api/health", method: "GET" });
      setAPIHealth(healthy ? "api is up! OK" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []); 
  

  /*not sure what I was trying to do here

  useEffect(() => {

    const getAPIStatus = async () => {
        const healthy = await callApi({ url: "/api/health", method: "GET" });
        setAPIHealth(healthy ? "api is up! OK" : "api is down :/");
      };
      getAPIStatus();
       
      const getOrders = async (id, status, userId) => {
         const orders = await callApi({ 
           url: "/api/orders", 
           method: "GET",
           token,
           data:{
             id,
             status,
             userId
           }
            });
         setOrders(orders);
       }
       getOrders(); 
     }, [setOrders]);
    */

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
        <Route exact path="/payment">
          {/* <Payment /> need state from 'const App' for cart here */}
        </Route>
        <Route exact path="/products">
          <AllProducts products={products} setProducts={setProducts} />
        </Route>
        <Route exact path="/products/:productId">
          <SingleProduct products={products} />
        </Route>
        <Route exact path="/user-info">
          {/* <User /> need cart state here */}
        </Route>
        <Route exact path="/login">
          <Login
            setLoggedIn={setLoggedIn}
            setToken={setToken}
            setMessage={setMessage}
          />
        </Route>
        <Route exact path="/register">
          <Register setToken={setToken} setMessage={setMessage} />
        </Route>
        <Route exact path="/admin">
          {/* <Admin /> need state for inventory here */}
        </Route>
        <Route exact path="/">
          {/* <Home /> */}
        </Route>
        <Route exact path="/account">
          <SingleUser token={token} loggedIn={loggedIn} />
        </Route>
        <Route exact path="/orders/:orderId">
          <SingleOrder orders={orders} token={token}/>
        </Route>
        <Route exact path="/cart">
          <Cart token={token} myCart={myCart} setMyCart={setMyCart}/>
        </Route>
      </div>
    </>
  );
};
export default App;

/*
useEffect(() => {

  const getAPIStatus = async () => {
      const healthy = await callApi({ url: "/api/health", method: "GET" });
      setAPIHealth(healthy ? "api is up! OK" : "api is down :/");
    };
    getAPIStatus();
     
    const getOrders = async () => {
       const orders = await callApi({ 
         url: "/api/orders", 
         method = "GET", 
         token, 
         data });
       setOrders(orders);
     }
     getOrders(); 
   }, [setOrders]);
  }
*/