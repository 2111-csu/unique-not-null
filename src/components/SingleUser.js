import React, { useState, useEffect } from "react";
import { callApi } from "../axios-services";

const SingleUser = ({ token, loggedIn }) => {
  const [user, setUser] = useState({});
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const apiResponse = await callApi({
          url: `/api/users/${loggedIn.username}/orders`,
          method: 'GET',
          token
        });
        setUser(loggedIn);
        console.log('api response, user:', apiResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getData();

  }, []);
    
  return (
    <div>
      {token && loggedIn ? (
        <>
          <h3>user id: {loggedIn.id}</h3>
          <h3>First Name: {loggedIn.firstName}</h3>
          <h3>Last Name: {loggedIn.lastName}</h3>
          <h3>email address: {loggedIn.email}</h3>
          {/* <img src="${user.imageurl}" alt="photo of ${user.username}"></img> */}
          <h3>username: {loggedIn.username}</h3>

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
