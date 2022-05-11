import React from 'react';

const AdminOrders = ( { orders } ) => {

  return <>
    {orders && orders.map(order => {
    return (
      <div id="orders-page" key={order.id} >
          <div id='order-container' key={order.id}>
          <h4><u>Order id: </u>{order.id}</h4>
          <h4><u>Order status: </u>{order.status}</h4>
          <h4><u>User id: </u>{order.userId}</h4>
          <h4><u>Date placed: </u>{order.datePlaced}</h4> 
          </div>

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

      </div> 

    ) } ) }
  </>
}

export default AdminOrders;