import React, { useState } from 'react';
import { callApi } from "../axios-services";

const CreateProduct = ({ token }) => {

const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState('');
const [inStock, setInStock] = useState(false);
const [category, setCategory] = useState('');

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const newProduct = await callApi({ 
        url: '/api/products',
        token,
        method:'POST',
        data: {
            name,
            description,
            price: Number(price),
            imageurl: image,
            inStock,
            category
        }
    });
    console.log('newProduct, ', newProduct);
    setName('');
    setDescription('');
    return newProduct;

    } catch(error){
    throw error
    }

}//close handleSubmit

return (

    <form className='create-product-container' onSubmit={handleSubmit}>
        <h4>Create new product.</h4>
        
        <input className='input-field' type='text'
         placeholder='product name' value={name}
         onChange={e => setName(e.target.value)}>
        </input>

        <input className='input-field' type='text'
          placeholder='description' value={description}
          onChange={e => setDescription(e.target.value)}>
        </input>

        <input className='input-field' type='text'
         placeholder=' price' value={price}
         onChange={e => setPrice(e.target.value)}>
        </input>

        <input className='input-field' type='text'
          placeholder='imageurl' value={image}
          onChange={e => setImage(e.target.value)}>
         </input>

         <input className='input-field' type='text'
          placeholder='instock'value={inStock}
          onChange={e => setInStock(e.target.value)}>
          </input>

        <input className='input-field' type='text'
         placeholder='category' value={category}
         onChange={e => setCategory(e.target.value)}>
         </input>

         <button className='button' type='submit'>Create Product</button>

    </form>

    )

} //function close

export default CreateProduct;