import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { callApi } from '../axios-services'
import "../style/Products.css";
import "../style/Home.css";

const Home = ({ products, setProducts }) => {
  const history = useHistory();
  const [index, setIndex] = useState(0);
 
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const getData = async () => {
    const apiResponse = await callApi({url: '/api/products', method: 'GET'});
    console.log(apiResponse);
    console.log(apiResponse.data);
    setProducts(apiResponse.data);
  }
  
  useEffect(() => {
    getData();
  }, [setProducts])

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === sortedproducts.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    }
  }, [index]);
  
  const goToProduct = (event, productId) => {
    event.preventDefault();
    history.push(`/products/${productId}`)
  }

  const delay = 2000;
  const timeoutRef = React.useRef(null);

  let sortedproducts = products.filter(product => product.id % 2 !== 0)

  return <div id='homepage'>
     <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {sortedproducts.map((product, index) => (
          <div className="slide" key={index}>
            <img src={product.imageurl} alt={`the ${product.name}`} />
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {sortedproducts.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}></div>
        ))}
      </div>
    </div>
    <h1>Fresh Off The Cob</h1>

    <div id="products-page">
      <div id='product-cards'>
        {sortedproducts && sortedproducts.map(product => {
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
  </div>

};

export default Home;