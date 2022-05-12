import React from 'react';
import { useHistory } from 'react-router-dom';
import { callApi } from "../axios-services";
import { Snackbar } from "./Snackbar";
import '../style/Cart.css'
import StripeContainer from './StripeContainer'

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

let total = 0;

return (
  <>
    <h1>Checkout</h1>
    <div className="checkout"> 
      
      {myCart? 
        <div id='cart-container'>
            
        {myCart.products && myCart.products.map((product) => {
          const lineTotal = product.price * product.quantity;
          total += lineTotal;
              return (
                <div key={product.id} className='cart-product'>
                  <div className='cart-image'>
                    <img src={product.imageurl} alt={`the ${product.name}`} className='small'/>
                  </div>
                  <div className='cart-info'>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price} / per pound</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Total: ${lineTotal}</p>
                  </div>
                </div>
              ) })} 
        </div> : <h1>No Products to show here</h1> }
      <div className='checkout-container'>
        <p>Order Total: ${total}</p>
        <StripeContainer token={token}/>
       {/* <button type="submit" className="button"
        onClick={e => handleCompleteOrder(e, myCart.id)}>
              Complete Order</button> */}

        <button type="submit" className="button"
        onClick={e => handleCancelOrder(e, myCart.id)}>
        Cancel Order</button>

        <label htmlFor="back-edit">Need to change your order?</label>
        <button type="submit" className="button"
        onClick={e => handleBackToCart(e, myCart.id)}>
        Return to Order</button>
      </div>
    </div>
  </>
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


put at top:
import StripeContainer from './StripeContainer'

>>>>>>>>>STRIPE<<<<<<<<<<<<<<<<

<div className='checkout-container'>
  <h2>Ready to Checkout?</h2>
  <p>Cart Total: ${total}</p>
  <StripeContainer />
  <button type="submit" className="button" onClick={clickCheckout} >Let's get Poppin!</button> 
</div>

 <StripeContainer token={token}/>

*/
