import React, { useState }from 'react';
import { useParams, useHistory } from 'react-router';
import "../style/SingleProduct.css";
import { callApi } from '../axios-services'

const SingleProduct = ({ token, products, myCart, loggedIn, guestCart, setGuestCart }) => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();
  
  const [product] = products.filter(product => product.id === Number(productId));
  console.log('product, singleProduct,',product);
  const handleAddProductToCart = async (event, myCart, product) => {
    event.preventDefault();
    if (!loggedIn) {
      const cart = guestCart.products;
      console.log('cart', cart);
      const newProd = {
        id: product.id,
        name: product.name,
        description: product.description,
        productId: product.id,
        price: product.price,
        quantity: Number(quantity),
        imageurl: product.imageurl
      }
      const newCart = [...cart, newProd]
      console.log('newCart', newCart);
      setGuestCart({products: newCart})
      localStorage.setItem('guestCart', JSON.stringify({products: newCart}));
      
    } else {
      try {
        const addedProduct = await callApi({
          url: `/api/orders/${myCart.id}/products`,
          method: "POST",
          token,
          data: {
            productId: product.id,
            price: Number(product.price),
            quantity: Number(quantity)
          }
        });
        console.log('product', addedProduct);
        history.push('/cart')
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    }    
  }

  const handleBackToProducts = (event) => {
    event.preventDefault();
    history.push('/products');
  }
  const handleBackToHome = (event) => {
    event.preventDefault();
    history.push('/');
  }

  return (
    <>
    <div id='single-product-page'>
    <div key={product.id} id='single-product'>
      <h3>{product.name}</h3>
      <img src={product.imageurl} alt={`the ${product.name}`} className='medium'/>

      <div id='prod-desc'>
        <p>{product.description}</p>
      </div>
      <div id='price-category'>
        <div><p>Category: {product.category}</p></div>
        <div><p>Price: ${product.price}</p></div>
      </div>
  
      <div id='quantity-button'>
        <input type='number' id='quantity-input' name='quantity' placeholder='Quantity'
         min='1'max='10'value={quantity} onChange={(event) => setQuantity(event.target.value)}/>
         <button className='button' type='submit' 
         onClick={(e) => handleAddProductToCart(e, myCart, product)}>Add Product to Cart</button>
     
        <div id='back-buttons'>
          <button type="submit" className="button"
          onClick={e => handleBackToProducts(e)}>
          Back to Products</button>

          <button type="submit" className="button"
          onClick={e => handleBackToHome(e)}>
          Back to Home</button>
        </div>

      </div>

     </div>

     <div id='reviews-section'>
        <h2><b>Reviews</b></h2>
        {product.reviews && product.reviews.map(review => {
          return (
            <div key={review.id} id='single-review'>
              <h4><b>{review.title}</b> </h4>
              <h4>{review.content}</h4>
              <h4><b>Stars: </b>{review.stars}/5</h4>
            </div>
          )
        })} 
      </div>
     
      {/* <button type="submit" className="button"
      onClick={e => handleBackToProducts(e)}>
      Back to Products</button>

      <button type="submit" className="button"
      onClick={e => handleBackToHome(e)}>
      Back to Home</button> */}
      
    </div>
    </>
  )
           
};

export default SingleProduct;

