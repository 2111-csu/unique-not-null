import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router';
import { callApi } from '../axios-services'

const AllProducts = ({ products, setProducts }) => {

  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search);
  const searchTerm = searchParams.get('searchTerm') || '';

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await callApi({url: '/api/products', method: 'GET'});
      console.log(apiResponse);
      console.log(apiResponse.data);
      setProducts(apiResponse.data);
    }
    getData();
  }, [setProducts]);
  
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
    <div id="products-page">

      <h2>Products Page</h2>
      <h3>Would you like some popcorn? yes</h3>

      <h5 id='search-word'>Search: </h5>
      <input id='search-field' type='text'placeholder='search here'
        onChange={(e) => { history.push(e.target.value ? `/products?searchTerm=${e.target.value}` : '/products') }}/>
      
      <div>
      {sortedProducts.map(product => {
        return (
          <div key={product.id} id='single-product'>
            <h4><u>Name:</u>
            <Link to={`/products/${product.id}`}> {product.name}
            </Link></h4>
            <h4><u>Description:</u> {product.description}</h4>
            <h4><u>Price:</u> {product.price}</h4>
            <img src={product.imageurl} alt={`the ${product.name}`} />
            <h4><u>In stock?</u> {product.inStock}</h4>   
          </div>
        )}
      )} 
      </div>

    </div>
  )

};

export default AllProducts;

//from line57  alt={`photo of ${product.name} the ${product.name}`}