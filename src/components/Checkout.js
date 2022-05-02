import React from 'react';
//, { useState }
//import { SingleUser } from './SingleUser';
//import { Cart } from './Cart';
//import { callApi } from "../axios-services";


const Checkout = () => {
  return (
    <div className="app-container">
      <h1>Checkout</h1>
      
    </div>
  );
}; 

/*
const Checkout = ({ token, myCart, setMyCart, message, setMessage }) => {

const [status, setStatus] = useState(null);

const handleCompleteOrder = async (event, status, orderId) => {
  event.preventDefault();
  try {
    const completeOrder = await callApi({
      url: `/api/orders/orderId`,
      method:"PATCH",
      token,
      data: {
        status
      }
    })
    setStatus('completed')

  } catch(error) {
    throw error
  }
}

const handleCancelOrder = async (event, status, orderId) => {
  event.preventDefault();
  try {
    const cancelOrder = await callApi({
      url: `/api/orders/orderId`,
      method:"DELETE",
      token,
      data: {
        status
      }
    })
    setStatus('canceled');
  } catch(error){
    throw error
  }
}

return (
  <div> 
    <SingleUser token={token} loggedIn={loggedIn} />

    <Cart myCart={myCart} setMyCart={setMyCart} token={token} />

    <button type="submit" className="button"
    onClick={e => handleCompleteOrder(e, order.id)}>
    Complete Order</button>

    <button type="submit" className="button"
    onClick={e => handleCancelOrder(e, order.id)}>
    Cancel Order</button>

  </div>
)
};
*/
 
export default Checkout;