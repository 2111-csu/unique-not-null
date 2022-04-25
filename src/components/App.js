import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import {
  Admin,
  Header,
  Home,
  Payment,
  AllProducts,
  SingleProduct,
  Login,
  User
} from './';

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, callApi } from '../axios-services';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  
  const userAuth = JSON.parse(localStorage.getItem('user'));
  const userToken = JSON.parse(localStorage.getItem('token'));
  const [token, setToken] = useState(userToken);
  const [loggedIn, setLoggedIn] = useState(userAuth);
  const [message, setMessage] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    
    const getAPIStatus = async () => {
      const healthy = await callApi({url: '/api/health', method: 'GET'});
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return <>
    <div className="app-container">
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
    </div>
    <Router>
      <div className='App'>
        {/* <Header /> need state from 'const App' for loggedIn here */}
            <Route exact path='/payment'>
              {/* <Payment /> need state from 'const App' for cart here */}
            </Route>
            <Route exact path='/products'>
              <AllProducts  products={products} setProducts={setProducts} />
              {/* <Products /> need state from 'const App' for inventory here */ }
            </Route>
            <Route exact path='/products/:id'>
              {/* <SingleProduct
              //need inventory state
              //need cart state
              /> */}
            </Route>
            <Route exact path='/user-info'>
              {/* <User /> need cart state here */}
            </Route>
            <Route exact path='/login'>
              <Login setLoggedIn={setLoggedIn} setToken={setToken} setMessage={setMessage} token={token}/> 
              {/* <Login /> need loggedIn state (setLoggedIn?) */}
            </Route>
            <Route exact path='/register'>
              <Register token={token} setToken={setToken} setMessage={setMessage}/>
              {/* <Register /> need loggedIn state (setLoggedIn?) */}
            </Route>
            <Route exact path='/admin'>
              {/* <Admin /> need state for inventory here */}
            </Route>
            <Route exact path='/'>
              {/* <Home /> */}
            </Route>
      </div>
    </Router>
    </>;
  };
export default App;
