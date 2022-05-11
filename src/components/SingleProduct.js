import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
//import { callApi } from '../axios-services'
import "../style/SingleProduct.css";

const SingleProduct = ({ products }) => {
  const { productId } = useParams();
  const history = useHistory();


  const [product] = products.filter(product => product.id === Number(productId));

  return (
    <div key={product.id} id='single-product' >
      <h4><u>Name:</u>{product.name}</h4>
      <h4><u>Description:</u>{product.description}</h4>
      <h4><u>Price: </u>{product.price}</h4>
      <img src={product.imageurl} alt={`the ${product.name}`}/>
      <h4><u>In stock?</u>{product.inStock}</h4>   
    </div>
  )
    
};

export default SingleProduct;

/* from line 17, alt={`photo of ${product.name} the ${product.name}`}

const SingleProduct = ({ products }) => {
  const { productId } = useParams();


  const [product] = products.filter(product => product.id === Number(productId));
  console.log('product.reviews,', product.reviews)

  const handleBackToProducts = (event) => {
    event.preventDefault();
    history.push('/products');
  }

  return (
    <>
    <div id='single-product-view'>
    <div key={product.id} id='single-product'>
      <h4>{product.name}</h4>
      <h4>{product.description}</h4>
      <h4>Price: ${product.price}</h4>
      <img src={product.imageurl} alt={`the ${product.name}`} className='medium'/>
      <h4>In stock?{product.inStock}</h4>   
     </div>

     <div id='reviews-section'>Reviews
        {product.reviews && product.reviews.map(review => {
          return (
            <div key={review.id} id='single-review'>
              <h4>{review.title} </h4>
              <h4>{review.content}</h4>
              <h4>Stars: {review.stars}</h4>
            </div>
          )
        })} 
      </div>  
     
      <button type="submit" className="button"
      onClick={e => handleBackToProducts(e)}>
      Back to Products</button>
    
    </div>
    </>
  )
        
};

export default SingleProduct;

/* 
*/