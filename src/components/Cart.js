import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { callApi } from "../axios-services";
import "../style/Cart.css";
//import StripeContainer from '.'

const Cart = ({ myCart, setMyCart, token, loggedIn, guestCart, setGuestCart }) => {

  const history = useHistory();
  const [quantity, setQuantity] = useState();
  const [guestQuantity, setGuestQuantity] = useState();

  const mergeCarts = async (visitorCart, userCart) => {
    if (userCart) {
      for (let i = 0; i < visitorCart.products.length; i++) {
        let product = visitorCart.products[i]
        try {
          const addProduct = await callApi({
            url: `api/orders/${userCart.id}/products`,
            method: "POST",
            token,
            data: {
              productId: product.productId,
              price: Number(product.price),
              quantity: Number(product.quantity)
            }
          });
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    }
  } 

  const getCart = async () => {
    if (!loggedIn && !guestCart) {
      localStorage.setItem('guestCart', JSON.stringify({products: []}));
    } else if (!loggedIn && guestCart) {
      return;
    } else {
      try {
        const userCart = await callApi({
          url: '/api/orders/cart',
          token,
          method: 'GET'
        });
        console.log('userCart57', userCart);
        if (!userCart.data.userCart[0]) {
          const newCart = await callApi({
            url: 'api/orders',
            method: 'POST',
            token
          });

          console.log('newCart65', newCart);
          const newUserCart = await callApi({
            url: '/api/orders/cart',
            token,
            method: 'GET'
          });

          console.log('userCart72', newUserCart.data);
          setMyCart(newUserCart.data.userCart[0])

        } else {
          console.log('userCart76', userCart.data);
          setMyCart(userCart.data.userCart[0]);
        }

        if (loggedIn && guestCart) {
          mergeCarts(guestCart, myCart)
        }

      } catch (error) {
        console.log(error);
        throw error;
      }
    }
      
  } 

  useEffect(() => getCart(), [guestCart]); 

  const handleEditQuantity = async (event, productId) => {
    event.preventDefault();
    try {
      const editedQuantity = await callApi ({
        url:`api/orderProducts/${productId}`,
        method: 'PATCH',
        token,
        data: {
          quantity: Number(quantity)
        }
      }).then(setMyCart(getCart))
      
    } catch(error) {
      console.log(error);
      throw error
    };
    
  };

  const handleRemoveProduct = async (event, productId) => {
    event.preventDefault();
      try {
      const deletedProduct = await callApi ({ 
        url: `api/orderProducts/${productId}`, 
        method: 'DELETE', 
        token })
        .then(setMyCart(getCart))
      } catch(error) {
        throw error
      }
    };
  
  const clickCheckout = (event) => {
    event.preventDefault();
    history.push('/cart/checkout');
  }

  const guestEdit = (event, productId) => {
    event.preventDefault();
    const cart = guestCart.products;
    const [editQuantity] = cart.filter(item => item.id === productId)
    console.log('prod', editQuantity);
    if (!guestQuantity || guestQuantity == 0) {
      if (cart.length === 1) {
        localStorage.setItem('guestCart', JSON.stringify({products: []}));
        getCart();
      } else {
        const editCart = cart.filter(item => item.id !== productId)
        console.log('newCart', editCart);
        setGuestCart({products: editCart})
        localStorage.setItem('guestCart', JSON.stringify({products: editCart}));
        getCart();
      }
    } else {
      const editCart = cart.filter(item => item.id !== productId)
      editQuantity.quantity = guestQuantity;
      const newCart = [...editCart, editQuantity]
      console.log('newCart', newCart);
      setGuestCart({products: newCart})
      localStorage.setItem('guestCart', JSON.stringify({products: newCart}));
      getCart();
    }
  }
  let total = 0;
  return (
    <div className='cart'>
      {myCart || guestCart ? null : <div><h1>There are no products in your cart</h1></div>}
      {guestCart && (!myCart || myCart === false) ? 
        <div className='cart-container'>
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
              <div  className='cart-buttons'>
                <input type='number' id='quantity-input' name='quantity' min='1'max='10'
                placeholder='Quantity' value={guestQuantity} onChange={(event) => setGuestQuantity(event.target.value)}/>
                <button type="submit" className="button"
                onClick={(event) => guestEdit(event, product.id)} >Edit / Remove</button> 
              </div>
            </div>
          );
        })}
        </div> : null}
      {myCart? 
      <div className='cart-container'>
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
            <div className='cart-buttons'>
              <input type='number' id='quantity-input' name='quantity' min='0'max='10'
              placeholder='Quantity' value={quantity} onChange={(event) => setQuantity(event.target.value)}/>
              
              <button type="submit"className="button"
              onClick={(e) => handleEditQuantity(e, product.id)}>Change Quantity</button>
              <button type="submit"className="button"
              onClick={(e) => handleRemoveProduct(e, product.id)}>Remove</button>
            </div>
          </div>
        );
      })}
      </div> 
      : null }
      <div className='checkout-container'>
        <h2>Ready to Checkout?</h2>
        <p>Cart Total: ${total}</p>
        <button type="submit" className="button" onClick={clickCheckout} >Let's get Poppin!</button> 
      </div>
    </div>
  );
};

export default Cart;

/*
put at top:
import StripeContainer from './StripeContainer'

>>>>>>>>>STRIPE<<<<<<<<<<<<<<<<

<div className='checkout-container'>
  <h2>Ready to Checkout?</h2>
  <p>Cart Total: ${total}</p>
  <StripeContainer />
  <button type="submit" className="button" onClick={clickCheckout} >Let's get Poppin!</button> 
</div>
*/