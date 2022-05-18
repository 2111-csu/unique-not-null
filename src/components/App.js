import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { callApi } from "../axios-services";
import {
  Admin,
  Home,
  AllProducts,
  AdminProducts,
  AdminOrders,
  AdminUsers,
  SingleProduct,
  SingleOrder,
  SingleUser,
  Login,
  Register,
  Title,
  Cart,
  Checkout
} from "./";
import "../style/App.css";
import EditUser from "./EditUser";
import EditProduct from "./EditProduct";


// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const userAuth = JSON.parse(localStorage.getItem("user"));
  const userToken = JSON.parse(localStorage.getItem("token"));
  const guest = JSON.parse(localStorage.getItem("guestCart"));
  const [token, setToken] = useState(userToken);
  const [loggedIn, setLoggedIn] = useState(userAuth);
  const [guestCart, setGuestCart] = useState(guest);
  const [message, setMessage] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState();
  const [myCart, setMyCart] = useState();
  const [users, setUsers] = useState();

  const getAPIStatus = async () => {
    const healthy = await callApi({ url: "/api/health", method: "GET" });
    setAPIHealth(healthy ? "api is up! OK" : "api is down :/");
  };

  const getCart = async () => {
    if (!loggedIn && !guestCart) {
      localStorage.setItem('guestCart', JSON.stringify({products: []}));
    } else if (!loggedIn && guestCart) {
      return;
    } else if (!myCart) {
      try {
        const userCart = await callApi({
          url: '/api/orders/cart',
          token,
          method: 'GET'
        });
        console.log('userCart57', userCart);
        if (!userCart.data.userCart[0]) {
          const newCart = await callApi({
            url: 'api/orders',
            method: 'POST',
            token
          });

          console.log('newCart65', newCart);
          const newUserCart = await callApi({
            url: '/api/orders/cart',
            token,
            method: 'GET'
          });

          console.log('userCart72', newUserCart.data);
          setMyCart(newUserCart.data.userCart[0])

        } else {
          console.log('userCart76', userCart.data);
          setMyCart(userCart.data.userCart[0]);
        }

      } catch (error) {
        console.log(error);
        throw error;
      }
    }
      
  } 

  useEffect(() => {
    getAPIStatus();
    getCart();

  }, [loggedIn, myCart, guestCart]); 
  
  return (
    <>
      <div className="app-container">
        <Title
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          message={message}
          setMessage={setMessage}
          setMyCart={setMyCart}
          setToken={setToken}
          setGuestCart={setGuestCart}
        />
        <Route exact path="/">
          <Home products={products} setProducts={setProducts}/>
        </Route>

        <Route exact path="/admin">
          <Admin  
            AdminProducts={<AdminProducts />}
            AdminOrders={<AdminOrders />}
            AdminUsers={<AdminUsers />}
            token={token}
            setMessage={setMessage}
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}

          />
        </Route>

        <Route exact path="/account">
          <SingleUser 
            token={token} 
            loggedIn={loggedIn} 
          />
        </Route>

        <Route exact path="/edit/users/:userId">
          <EditUser
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            token={token}
            />
        </Route>

        <Route exact path="/cart">
          <Cart 
            token={token} 
            myCart={myCart} 
            setMyCart={setMyCart}
            loggedIn={loggedIn}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
          />
        </Route>

        <Route exact path="/cart/checkout">
          <Checkout 
            token={token} 
            myCart={myCart} 
            setMessage={setMessage} 
            setMyCart={setMyCart}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
          />
        </Route>

        <Route exact path="/edit/product/:productId">
          <EditProduct 
            products={products}
            token={token}
          />
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
            loggedIn={loggedIn}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
          />
        </Route>

        <Route exact path="/products/:productId">
          <SingleProduct 
            token={token} 
            products={products} 
            myCart={myCart} 
            loggedIn={loggedIn}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
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