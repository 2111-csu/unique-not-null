import React, { useState } from 'react';
import { callApi } from "../axios-services";

const CreateProduct = ({ token }) => {

const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState('');
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

    <form className='create-product-form' id='single-product' onSubmit={handleSubmit}>
        <h3>Create new product</h3>
        
        <input className='input-field' type='text'
        placeholder='product name' value={name}
        onChange={e => setName(e.target.value)}>
        </input>

        <input className='input-field' type='text'
        placeholder='description' value={description}
        onChange={e => setDescription(e.target.value)}>
        </input>

        <input className='desc-field' id='' type='text'
        placeholder=' price' value={price}
        onChange={e => setPrice(e.target.value)}>
        </input>

        <input className='input-field' type='text'
        placeholder='imageurl' value={image}
        onChange={e => setImage(e.target.value)}>
        </input>
        <select id="select" onChange={(e) => {setCategory(e.target.value)}}>
            <option>Select A Category</option>
            <option value="Sweet">Sweet</option>
            <option value="Savory">Savory</option>
            <option value="Sweet & Savory">Sweet & Savory</option>
        </select>

        <button className='button' type='submit'>Create Product</button>

    </form>

    )

} //function close

export default CreateProduct;