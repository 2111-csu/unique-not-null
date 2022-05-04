import React from 'react';
import { useHistory } from 'react-router-dom';
import { callApi } from "../axios-services";

const Checkout = ({ token, myCart, message, setMessage }) => {

const history = useHistory();

const handleCompleteOrder = async (event, orderId) => {

  event.preventDefault();
  try {
    const completeOrder = await callApi({
      url: `/api/orders/${orderId}`,
      method:"PATCH",
      token,
      data: {
        status: 'completed'
      }
    })

  } catch(error) {
    throw error
  }
}

const handleCancelOrder = async (event, orderId) => {
  event.preventDefault();
  try {
    const cancelOrder = await callApi({
      url: `/api/orders/${orderId}`,
      method:"DELETE",
      token,
      data: {
        status: 'canceled'
      }
    })
   
  } catch(error){
    throw error
  }
}

const handleBackToCart = (event, orderId) => {
  event.preventDefault();
  history.push('/cart');
}

return (
  <div className="app-container"> 
    <h1>Checkout</h1>

    <div key={myCart.id} id="single-order" style={{ border: "1px solid black", margin:"20px"}}>
        <h4><u>User id: </u>{myCart.userId}</h4>
        <h4><u>Order id: </u>{myCart.id}</h4>
        <h4><u>Date placed: </u>{myCart.datePlaced}</h4>
    </div> 
      
   {myCart.products && myCart.products.map((product) => {
        return (
          <div key={product.id} className='product-container'>
            <h4>product id: {product.id}</h4>
            <h4>product name: {product.name}</h4>
            <h4>product description: {product.description}</h4>
            <h4>price: {product.price}</h4>
            <img src={product.imageurl} alt={`the ${product.name}`} className='small'/>
          </div>
        ) })} 
  
    <button type="submit" className="button"
    onClick={e => handleCompleteOrder(e, myCart.id)}>
    Complete Order</button>

    <button type="submit" className="button"
    onClick={e => handleCancelOrder(e, myCart.id)}>
    Cancel Order</button>

    <label htmlFor="back-edit">Need to change your order?</label>
    <button type="submit" className="button"
    onClick={e => handleBackToCart(e, myCart.id)}>
    Return to Order</button>

  </div>
)
};

 
export default Checkout;

/*
const Checkout = () => {
  return (
    <div className="app-container">
      <h1>Checkout</h1>
      
    </div>
  );
}; 
*/