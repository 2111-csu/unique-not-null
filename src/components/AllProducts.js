import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router';
import { callApi } from '../axios-services'
import "../style/Products.css";

const AllProducts = ({ token, products, setProducts, myCart, loggedIn, guestCart, setGuestCart }) => {
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

  const viewSweet = (event) => {
    event.preventDefault();
    history.push('/products?searchTerm=Sweet')
  }

  const viewSavory = (event) => {
    event.preventDefault();
    history.push('/products?searchTerm=Savory')
  }

  const viewSweetSavory = (event) => {
    event.preventDefault();
    history.push('/products?searchTerm=Sweet%20&%20Savory')
  }

  const viewAll = (event) => {
    event.preventDefault();
    history.push('/products')
  }

  const handleAddProductToCart = async (event, productId, price, myCart, product) => {
    event.preventDefault();
    if (!loggedIn) {
      const cart = guestCart.products;
      console.log('cart', cart);
      const newProd = {
        id: product.id,
        name: product.name,
        description: product.description,
        productId: productId,
        price: Number(price),
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
        console.log('error', error);
        throw error;
      }
    }    
  }

  const goToProduct = (event, productId) => {
    event.preventDefault();
    history.push(`/products/${productId}`)
  }

  return (
    <div id="products-page">
      <div id='search-container'>
        <h5 id='search-word'>Search Popcorn: </h5>
        <input id='search-field' type='text'placeholder='search'
        onChange={(e) => { history.push(e.target.value ? `/products?searchTerm=${e.target.value}` : '/products') }}/>
        <h4>Browse by Category</h4>
        <button className='button' type='submit' onClick={viewSweet}>Sweet</button>
        <button className='button' type='submit' onClick={viewSavory}>Savory</button>
        <button className='button' type='submit' onClick={viewSweetSavory}>Sweet & Savory</button>
        <button className='button' type='submit' onClick={viewAll}>Clear</button>
      </div>
      

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
              <div id='quantity-button'>
                <input type='number' id='quantity-input' name='quantity' placeholder='Quantity'
                min='0'max='10'value={quantity} onChange={(event) => setQuantity(event.target.value)}/>
                <button className='button' type='submit' 
                onClick={(e) => handleAddProductToCart(e, product.id, product.price, myCart, product)}>Add Product to Cart</button>
              </div>
            </div>
          )}
        )} 
      </div>

    </div>
  )

};

export default AllProducts;

//from line57  alt={`photo of ${product.name} the ${product.name}`}
