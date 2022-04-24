import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router';
import { getAllProducts  } from '../api';
import { SingleProduct } from '.';

const AllProducts = ({ products, setProducts }) => {

    const { search } = useLocation();
    const history = useHistory();
    const searchParams = new URLSearchParams(search);
    const searchTerm = searchParams.get('searchTerm') || '';

    useEffect(() => {
        const getData = async () => {
          const apiResponse = await getAllProducts();
          setProducts(apiResponse);
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
          <h3>Would you like to buy any popcorn?</h3>
    
          <h5 id='search-word'>Search: </h5>
          <input id='search-field' type='text'placeholder='search here'
           onChange={(e) => { history.push(e.target.value ? `/products?searchTerm=${e.target.value}` : '/products') }}/>
          
          <div>
          {sortedProducts.map(product =>
            <SingleProduct key={product.id} product={product}>
              <Link to={`/products/${product.id}`}>See details</Link>
            </SingleProduct>
          )} </div>
    
        </div>
      )

    };

export default AllProducts;