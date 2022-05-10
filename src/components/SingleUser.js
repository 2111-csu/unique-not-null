import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { callApi } from "../axios-services";

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
    <div id='single-user-view'>
      {token && loggedIn ? (
        <div key={user.id}>
          <h3>user id: {user.id}</h3>
          <h3>First Name: {user.firstName}</h3>
          <h3>Last Name: {user.lastName}</h3>
          <h3>email address: {user.email}</h3>
          <img src={`${user.imageurl}`} alt={`${user.username}`}></img>
          <h3>username: {user.username}</h3>

          <button type="submit" className="button"
           onClick={e => handleEdit(e, user.id)}>Edit User</button>

          {myOrders && myOrders.map((order) => {
            return (
              <div key={order.id}>
                <h4>order id: {order.id}</h4>
                <h4>order status: {order.status}</h4>
                <h4>date placed: {order.datePlaced}</h4>

                {order.products.map((product) => {
                  return (
                    <div id='product-view' key={product.id}>
                      <h4>order id: {order.id}</h4>
                      <h4>product id: {product.id}</h4>
                      <h4>product name: {product.name}</h4>
                      <h4>product description: {product.description}</h4>
                      <h4>price: {product.price}</h4>
                      <h4>quantity: {product.quantity}</h4>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SingleUser;
