import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router';
import { callApi } from '../axios-services'

const AllProducts = ({ token, products, setProducts, myCart }) => {
  const [quantity, setQuantity] = useState();
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
  console.log('mycart', myCart);
  const sortedProducts = products.filter(product => productMatches(product, searchTerm));

  const handleAddProductToCart = async (event, productId, price, myCart) => {
    event.preventDefault();
    try {
      const addedProduct = await callApi({
        url: `api/orders/${myCart.id}/products`,
        method: "POST",
        token,
        data: {
          productId,
          price: Number(price),
          quantity: Number(quantity)
        }
      });
      setQuantity();
      console.log('product', addedProduct);
      history.push('/cart')
    } catch (error) {
      throw error;
    }
    
}

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
            <input type='number' id='quantity-input' name='quantity' placeholder='Quantity' value={quantity} onChange={(event) => setQuantity(event.target.value)}/>
            <button className='button' type='submit' 
            onClick={(e) => handleAddProductToCart(e, product.id, product.price, myCart)}>Add to Cart</button>
            
          </div>
        )}
      )} 
      </div>

    </div>
  )

};

export default AllProducts;

//from line57  alt={`photo of ${product.name} the ${product.name}`}
