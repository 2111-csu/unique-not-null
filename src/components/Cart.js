import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
//import { getOrderProductById } from "../../db/orderProducts";
//import { getProductById } from "../../db/products";
//import { addProductToOrder } from "../../db/orderProducts";
import { callApi } from "../axios-services";

const Cart = ({ myCart, setMyCart, token}) => {
  
  const history = useHistory();

  useEffect(() => {
    const getCart = async () => {
      const userCart = await callApi({
        url: '/api/orders/cart',
        token,
        method: 'GET'
      });

      console.log('userCart', userCart.data);
      setMyCart(userCart.data[0]);
    }
    getCart();
  }, [])


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
            <h4>quantity: {product.quantity}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Cart;

/* 
 <div key={myCart.id} id="single-order" style={{ border: "1px solid black", margin:"20px"}}>
        <h4><u>Order id: </u>{myCart.id}</h4>
        <h4><u>Order status: </u>{myCart.status}</h4>
        <h4><u>User id: </u>{myCart.userId}</h4>
        <h4><u>Date placed: </u>{myCart.datePlaced}</h4>
      </div>
*/
