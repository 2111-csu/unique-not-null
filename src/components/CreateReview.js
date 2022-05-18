import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { callApi } from "../axios-services";
import '../style/App.css';
import '../style/Products.css';

const CreateReview = ( {token, loggedIn, products} ) => {

    const { productId } = useParams();
    const history = useHistory();
    const [product] = products.filter(product => product.id === Number(productId));
    console.log('product', product);   
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [stars, setStars] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const review= await callApi({ 
            url: '/api/reviews',
            token,
            method:'POST',
            data: {
                userId: loggedIn.id,
                title,
                content,
                stars: Number(stars),
                productId          
            }
        });
        console.log('review, ', review);
        setTitle('');
        setContent('');
        setStars('');

        history.push('/products');
    
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
            onChange={e => setTitle(e.target.value)}>
            </input>
            <br />

            <input className='input-field' type='text'
            placeholder='content' value={content}
            onChange={e => setContent(e.target.value)}>
            </input>
          
            <input className='input-field' type='number' min='1' max ='5'
            placeholder='stars' value={stars}
            onChange={e => setStars(e.target.value)}>
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