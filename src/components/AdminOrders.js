import React from 'react';
import "../style/AdminOrders.css";

const AdminOrders = ( { orders } ) => {

  return <>
    {orders && orders.map(order => {
    return (
      <div id="admin-orders-page">
      <div id="admin-order" key={order.id}> 
          <div id='order-container' key={order.id} >
          <h4>Order id: {order.id}</h4>
          <h4>Order status: {order.status}</h4>
          <h4>User id: {order.userId}</h4>
          <h4>Date placed: {order.datePlaced}</h4> 
          </div>

          {order.products && order.products.map((product) => {
          return (
            <div key={product.id} className='product-container'>
              <li>product id: {product.id}</li>
              <li>product: {product.name}</li>
              <li>price: {product.price}</li>
              <li>quantity: {product.quantity}</li>
            </div>
          ) } ) }

      </div> 
      </div>
    ) } ) }
  </>
}

export default AdminOrders;

/*
style={{ border: "3px solid black", margin:"5px", padding: "5px" }}
style={{ border: "2px solid black", margin:"5px" , padding: "2px"}}

{order.products && order.products.map((product) => {
          return (
            <div key={product.id} className='product-container'style={{ border: "1px solid black" }}>
              <h4>product id: {product.id}</h4>
              <h4>product name: {product.name}</h4>
              <h4>product description: {product.description}</h4>
              <h4>price: {product.price}</h4>
              <h4>quantity: {product.quantity}</h4>
            </div>
          ) } ) }

*/