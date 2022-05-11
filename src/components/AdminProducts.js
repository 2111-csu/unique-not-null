import React from 'react';
import { useLocation, useHistory } from 'react-router';
import "../style/Products.css";

const AdminProducts = ({ products }) => {
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search);
  const searchTerm = searchParams.get('searchTerm') || '';
  
  const goToProduct = (event, productId) => {
    event.preventDefault();
    history.push(`/products/${productId}`)
  }
  const productMatches = (product, searchTerm) => {
    const { name, description, category } = product;   
    const toCheck = [name, description, category]
    for (const field of toCheck) {
      if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  }

  const sortedProducts = products.filter(product => productMatches(product, searchTerm));

  return (
    <>
      <div id='search-container'>
        <h5 id='search-word'>Search Popcorn: </h5>
        <input id='search-field' type='text'placeholder='search'
        onChange={(e) => { history.push(e.target.value ? `/products?searchTerm=${e.target.value}` : '/products') }}/>
      </div>
      <div id="products-page">
        
        <div id='product-cards'>
          {sortedProducts.length? null : <h2>Sorry, No Products to View</h2>}
          {sortedProducts.map(product => {
            return (
              <div key={product.id} id='single-product'>
                <h3>{product.name}</h3>
                <img src={product.imageurl} alt={`the ${product.name}`} className='medium'/>
                <div id='prod-desc'>
                  <p>{product.description}</p>
                </div>
                  <p>Category: {product.category}</p>
                  <p>${product.price}</p>
                <button className='product-button' type='submit' 
                  onClick={(e) => goToProduct(e, product.id)}>View Product Details</button>
              </div>
            )}
          )} 
        </div>
      </div>
    </>
  )

};

export default AdminProducts;