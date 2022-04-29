import React from 'react';
import { useParams } from 'react-router-dom';

const SingleOrder = ({ orders }) => {
  const { orderId } = useParams();
  
  const [order] = orders.filter((order) => order.id === Number(orderId));
  
  return (
    <>
      <div key={order.id} id="single-order" style={{ border: "1px solid black" }}>
        <h4><u>Order id: </u>{order.id}</h4>
        <h4><u>Order status: </u>{order.status}</h4>
        <h4><u>User id: </u>{order.userId}</h4>
        <h4><u>Date placed: </u>{order.datePlaced}</h4>
      </div>

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
};

export default SingleOrder;