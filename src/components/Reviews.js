import React, { useEffect } from "react";
import { useLocation, useHistory } from 'react-router';
//import reviewsRouter from "../../api/reviews";
import { callApi } from '../axios-services'

const Reviews = ({ products, setProducts }) => {

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
    }, [setProducts])

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

    {sortedProducts.map(product => {
    return (
        <div className="reviews">
            <p>This is where reviews will go.</p>   

            <h5 id='search-word'>Search: </h5>
            <input id='search-field' type='text'placeholder='search here'
            onChange={(e) => { history.push(e.target.value ? `/products?searchTerm=${e.target.value}` : '/products') }}/>
            
            <div id='reviews-section'>
            {product.reviews && product.reviews.map(review => {
             return (
                <div key={review.id} id='single-review'>
                <h4>Title: {review.title} </h4>
                <h4>Content: {review.content}</h4>
                <h4>Stars: {review.stars}</h4>
                </div>
              )
             })} 
            </div>

          </div> 
    ) } )
};

}
export default Reviews;

/*
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [stars, setStars] = useState('');
const [username, setUsername] = useState('');

const sortedReviews = reviews.filter(review => sortedProducts.filter(
          product => product.id == review.productId))
        

*/