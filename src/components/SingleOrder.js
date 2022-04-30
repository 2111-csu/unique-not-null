import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callApi } from '../axios-services';

const SingleOrder = ({ token }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    const getOrder = async () => {
      const order = await callApi({
        url: `/api/orders/${orderId}`,
        method: 'GET',
        token
      })
      
      setOrder(order.data);
       
    };
    getOrder();
  }, [token]);

  return (
    <>
      {order ? 
      <div id="single-order" style={{ border: "1px solid black" }}>
        <h4><u>Order id: </u>{order.id}</h4>
        <h4><u>Order status: </u>{order.status}</h4>
        <h4><u>User id: </u>{order.userId}</h4>
        <h4><u>Date placed: </u>{order.datePlaced}</h4> 
        <div>
          {order.products && order.products.map((product) => {
            return (
              <div key={product.id} style={{ border: "1px solid black" }}>
                <h4>product id: {product.id}</h4>
                <h4>product name: {product.name}</h4>
                <h4>product description: {product.description}</h4>
                <h4>price: {product.price}</h4>
                <h4>quantity: {product.quantity}</h4>
              </div>
              
            );
          })}
        </div>
      </div> : <h1>Nothing To View</h1> }
    </>
  );
};

export default SingleOrder;