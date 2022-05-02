import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { callApi } from "../axios-services";

const Cart = ({ myCart, setMyCart, token}) => {

  const history = useHistory();
  const [quantity, setQuantity] = useState();


  const getCart = async () => {
    const userCart = await callApi({
      url: '/api/orders/cart',
      token,
      method: 'GET'
    });
    console.log('userCart', userCart.data);
    setMyCart(userCart.data[0]);
  }

  useEffect(() => getCart(), []); 

  /* new stuff */
  const handleEditQuantity = async (productId) => {
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

  const handleRemoveProduct = async (event, orderProductId) => {
    event.preventDefault();
    await callApi ( { url: `/orderProducts/${orderProductId}`, method: "DELETE", token });
    //getCart();
  };

  return (
    <>
      <div key={myCart.id} id="single-order" style={{ border: "1px solid black", margin:"20px"}}>
        <h4><u>Order id: </u>{myCart.id}</h4>
        <h4><u>Date placed: </u>{myCart.datePlaced}</h4>
      </div>

      {myCart.products && myCart.products.map((product) => {
        return (
          <div key={product.id}>
            <h4>product id: {product.id}</h4>
            <h4>product name: {product.name}</h4>
            <h4>product description: {product.description}</h4>
            <h4>price: {product.price}</h4>

            <input type='number' id='quantity-input' name='quantity' placeholder='Quantity' value={quantity} onChange={(event) => setQuantity(event.target.value)}/>

            <h4>quantity: {product.quantity}</h4>

          {/*new buttons*/}
            <button type="submit"className="button"
            onClick={() => handleEditQuantity(product.id)}>Edit Quantity</button>

            <button type="submit"className="button"
            onClick={(e) => handleRemoveProduct(e, product.id)}>Remove Product</button>  

          </div>
        );
      })}
    </>
  );
};

export default Cart;

/* 
*/
