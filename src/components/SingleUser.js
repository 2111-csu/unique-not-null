import React, { useState, useEffect } from "react";
import { callApi } from "../axios-services";

const SingleUser = ({ token, loggedIn }) => {
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
       });
       setUser(apiResponse);
       console.log('api response, user:', apiResponse);

    };
    getData();

  }, []);
    
  return (
    <div>
      {token && loggedIn ? (
        <>
          <h3>user id: {user.id}</h3>
          <h3>First Name: {user.firstName}</h3>
          <h3>Last Name: {user.lastName}</h3>
          <h3>email address: {user.email}</h3>
          <img src="${user.imageurl}" alt="${user.username}"></img>
          <h3>username: {user.username}</h3>

          {myOrders && myOrders.map((order) => {
            return (
              <>
                <h4>order id: {order.id}</h4>
                <h4>order status: {order.status}</h4>
                <h4>date placed: {order.datePlaced}</h4>

                {order.products.map((product) => {
                  return (
                    <div>
                      <h4>order id: {order.id}</h4>
                      <h4>product id: {product.id}</h4>
                      <h4>product name: {product.name}</h4>
                      <h4>product description: {product.description}</h4>
                      <h4>price: {product.price}</h4>
                      <h4>quantity: {product.quantity}</h4>
                    </div>
                  );
                })}
              </>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default SingleUser;
