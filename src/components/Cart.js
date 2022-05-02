import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom" 
//, useParams
//import { getOrderProductById } from "../../db/orderProducts";
//import { getProductById } from "../../db/products";
//import { addProductToOrder } from "../../db/orderProducts";
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
  useEffect(() => {
   getCart();  
},[]); 

  /*useEffect(() => {
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
*/

  /* new stuff */
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
      })
      setQuantity();
      console.log('edited quantity', editedQuantity)
      getCart()
    } catch(error) {
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
            onClick={(e) => handleEditQuantity(e, product.id)}>Edit Quantity</button>

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
