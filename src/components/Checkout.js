import React from 'react';
import { useHistory } from 'react-router-dom';
import { callApi } from "../axios-services";
import { Snackbar } from "./Snackbar";

const Checkout = ({ token, myCart, setMessage, setMyCart }) => {

const history = useHistory();

const handleCompleteOrder = async (event, orderId) => {
  event.preventDefault();
  try {
    const completeOrder = await callApi({
      url: `/api/orders/${orderId}`,
      method: "PATCH",
      token,
      data: {
        status: 'completed'
      }
    })
    console.log('completeOrder', completeOrder);
    setMyCart(null);
    localStorage.removeItem("guestCart");
    localStorage.setItem('guestCart', JSON.stringify({products: []}));
    setMessage('Thank You For Your Order');
    Snackbar();
    history.push('/')
  } catch(error) {
    throw error
  }
}

const handleCancelOrder = async (event, orderId) => {
  event.preventDefault();
  try {
    const cancelOrder = await callApi({
      url: `/api/orders/${orderId}`,
      method: "PATCH",
      token,
      data: {
        status: 'canceled'
      }
    });
    console.log('cancelOrder', cancelOrder);
    setMyCart(null);
    localStorage.removeItem("guestCart");
    localStorage.setItem('guestCart', JSON.stringify({products: []}));
    setMessage("Order Canceled");
    Snackbar();
    history.push('/')
  } catch(error){
    throw error
  }
}

const handleBackToCart = (event) => {
  event.preventDefault();
  history.push('/cart');
}

return (
  <div className="app-container"> 
    <h1>Checkout</h1>
    {myCart? 
      <>
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
          </> : <h1>Nothing to show here</h1> }
  
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