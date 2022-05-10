import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { callApi } from "../axios-services";
import "../style/User.css";

const SingleUser = ({ token, loggedIn }) => {

  const history = useHistory();
  const [user, setUser] = useState({});
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await callApi({
        url: `/api/users/me`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        token 
       });
       setUser(apiResponse.data);
       console.log('api response, user:', apiResponse);

      const getOrders = await callApi({
        url: `api/users/${loggedIn.id}/orders`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        token
      });
      console.log(getOrders.data);
      setMyOrders(getOrders.data);
    };
    getData();

  }, [loggedIn]);

  const handleEdit = async (event, userId) => {
    event.preventDefault();
    history.push(`/admin/users/${userId}`)
  }
  console.log('myOrders', myOrders);

  

  return (
    <div id='single-user'>
      {loggedIn ? (
        <>
          <div id='user-info'>
            <h2><u>Account Information</u></h2>
            <p>First Name: {loggedIn.firstName}</p>
            <p>Last Name: {loggedIn.lastName}</p>
            <p>Email Address: {loggedIn.email}</p>
            <p>Username: {loggedIn.username}</p>

            <button type="submit" className="button"
            onClick={e => handleEdit(e, user.id)}>Edit Account</button>
          </div>
          
          <div id='all-orders'>
            {myOrders && myOrders.map((order) => {
              return (
                <div key={order.id} id='order-card'>
                  <div id='order-info'>
                    <h3>order id: {order.id}</h3>
                    <h3>Order Status: {order.status}</h3>
                    <h3>Date Placed: {order.datePlaced}</h3>
                  </div>
                  
                  <div id='products'>
                    {order.products.map((product) => {
                      const lineTotal = product.price * product.quantity;
                      return (
                        <div id='order-product' key={product.id}>
                          <p>{product.name} | ${product.price}ea</p>
                          <p>quantity: {product.quantity} | Product Total: ${lineTotal}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SingleUser;
