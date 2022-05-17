import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { callApi } from '../axios-services';
import "../style/AdminOrders.css";

const AdminOrders = ( { token, orders, getOrders } ) => {

  const [status, setStatus] = useState();
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search);
  const searchTerm = searchParams.get('searchTerm') || '';

  const orderMatches = (order, searchTerm) => {
    const { status } = order;   
    const toCheck = [status]
    for (const field of toCheck) {
      if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  }

  const sortedOrders = orders.filter(order => orderMatches(order, searchTerm));

  const viewCreated = (event) => {
    event.preventDefault();
    history.push('/admin?searchTerm=created')
  }

  const viewProcessing = (event) => {
    event.preventDefault();
    history.push('/admin?searchTerm=processing')
  }

  const viewCompleted = (event) => {
    event.preventDefault();
    history.push('/admin?searchTerm=completed')
  }

  const viewCanceled = (event) => {
    event.preventDefault();
    history.push('/admin?searchTerm=canceled')
  }

  const viewAll = (event) => {
    event.preventDefault();
    history.push('/admin')
  }

  const handleEditOrderStatus = async (event, orderId) => {
    event.preventDefault();
    try {
      const editedOrderStatus = await callApi({
        url:`/api/orders/${orderId}`,
        method: 'PATCH',
        token,
        data: {
          id:orderId,
          status
        }
      })
      console.log('edit status, ', editedOrderStatus)
      setStatus()
      getOrders();
    }
    
    catch(error) {
      throw error
     }
  }
  
  return ( 
      <>
      <h4>Filter: </h4>
      <div id="order-filter-status">
       <button className='button' type='submit' onClick={viewCreated}>Created</button>
       <button className='button' type='submit' onClick={viewProcessing}>Processing</button>
       <button className='button' type='submit' onClick={viewCompleted}>Completed</button>
       <button className='button' type='submit' onClick={viewCanceled}>Canceled</button>
       <button className='button' type='submit' onClick={viewAll}>All orders</button>
      </div>
      <div id="admin-orders-page">
   {sortedOrders.length ? null: <h2>Sorry, no orders to view.</h2>}
    {sortedOrders && sortedOrders.map(order => {
    return (
      <div id="admin-order" key={order.id}> 
          <div id='order-container' key={order.id} >
          <h4>Order no. {order.id}</h4>
          <h4>User id: {order.userId}</h4>
          <h4>Date placed: {order.datePlaced.slice(0, 10)}</h4> 
          <h4>Order status: {order.status}</h4>

          <select id="select" onChange={(e) => {setStatus(e.target.value)}}>
            <option>Change order status:</option>
            <option value='created'>created</option>
            <option value='processing'>processing</option>
            <option value='completed'>completed</option>
            <option value='canceled'>canceled</option>
          </select>

          <button type="submit"className="button"
          onClick={(e) => handleEditOrderStatus(e, order.id)}>Edit Status</button>

        
         
          
            {order.products && order.products.map((product) => {
            return (
              <div key={product.id}>
                <p>{product.quantity}x {product.name} | ${product.price}ea </p>
              </div>
            ) } ) }
            {order.products.length? null : <p>No Products in Order</p>}
          </div>

      </div> 
    ) } ) }
    </div>
  </> )
}

export default AdminOrders;

/*
*/