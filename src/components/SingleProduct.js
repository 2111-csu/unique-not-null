import React from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = ({ products }) => {
  const { productId } = useParams();

  const [product] = products.filter(product => product.id === Number(productId));

  return (
    <div
      key={product.id}
      id='single-product'
      style={{ border: "1px solid black" }}>
      <h4><u>Name:</u>{product.name}</h4>
      <h4><u>Description:</u>{product.description}</h4>
      <h4><u>Price: </u>{product.price}</h4>
      <img src={product.imageurl} alt={`photo of ${product.name} the ${product.name}`}/>
      <h4><u>In stock?</u>{product.inStock}</h4>   
    </div>
  )
        
};

export default SingleProduct;