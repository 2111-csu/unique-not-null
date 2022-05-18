import React from 'react';
import { useHistory } from 'react-router-dom';
import { callApi } from "../axios-services";
import { Snackbar } from "./Snackbar";
import '../style/Cart.css'
import StripeContainer from './StripeContainer'

const Checkout = ({ token, myCart, setMessage, setMyCart, guestCart, setGuestCart }) => {

const history = useHistory();

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
      {myCart? 
        <div className="checkout">
            
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
        
      <div className='checkout-container'>
        <p>Order Total: ${total}</p>
        <StripeContainer setMessage={setMessage} orderId={myCart.id} setMyCart={setMyCart} token={token}/>

        <button type="submit" className="button"
        onClick={e => handleCancelOrder(e, myCart.id)}>
        Cancel Order</button>

        <label htmlFor="back-edit">Need to change your order?</label>
        <button type="submit" className="button"
        onClick={handleBackToCart}>
        Return to Order</button>
      </div>
      </div> : null }
      
      {guestCart && (!myCart || myCart === false) ?
        <div className="checkout">
            
        {guestCart.products && guestCart.products.map((product) => {
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
       
      <div className='checkout-container'>
        <p>Order Total: ${total}</p>
        <StripeContainer setMessage={setMessage} orderId={null} setGuestCart={setGuestCart} token={token}/>
       {/*  */}

        <button type="submit" className="button"
        onClick={e => handleCancelOrder(e, myCart.id)}>
        Cancel Order</button>

        <label htmlFor="back-edit">Need to change your order?</label>
        <button type="submit" className="button"
        onClick={handleBackToCart}>
        Return to Order</button>
      </div>
    </div> : null }
  </>
  )
};
 
export default Checkout;


/*
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

<button type="submit" className="button"
onClick={e => handleCompleteOrder(e, myCart.id)}>
Complete Order</button>

*/