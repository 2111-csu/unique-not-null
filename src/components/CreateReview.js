import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { callApi } from "../axios-services";
import '../style/App.css';
import '../style/Products.css';

const CreateReview = ( {token, products} ) => {

    const { productId } = useParams();
    const { history } = useHistory();
    const [product] = products.filter(product => product.id === Number(productId));
    console.log('product', product);   
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [stars, setStars] = useState();

    const handleSubmit = async (event, productId) => {
        event.preventDefault();
        try {
        const review= await callApi({ 
            url: '/api/reviews',
            token,
            method:'POST',
            data: {
                title,
                content,
                stars, 
                productId          
            }
        });
        console.log('review, ', review);
        setTitle('');
        setContent('');
        setStars('');

        history.push(`/products/${productId}`)
        return review;
    
        } catch(error){
        throw error
        }
    }

    return (

        <div id='container'>
        <div className='create-review-form' id='single-review'>

        <form onSubmit={handleSubmit}>
            <h3>Add a review</h3>
            
            <input className='input-field' type='text'
            placeholder='title' value={title}
            onChange={e => setTitle(e.target.value, product.id)}>
            </input>
            <br />

            <input className='input-field' type='text'
            placeholder='content' value={content}
            onChange={e => setContent(e.target.value, product.id)}>
            </input>
          
            <input className='input-field' type='text'
            placeholder='stars' value={stars}
            onChange={e => setStars(e.target.value, product.id)}>
            </input>
    
            <button className='button' type='submit'>Add Review</button>
    
        </form>
        </div>
        </div>
        )

}

export default CreateReview;

/*
<label htmlFor='title'>title:</label>
<label htmlFor='content'>content:</label>
<label htmlFor='stars'>stars:</label>

*/