import React, { useState } from 'react';
import { callApi } from "../axios-services";
import { useParams, useHistory } from 'react-router-dom';
import "../style/App.css";

const EditProduct = ({ token, products }) => { 

const { productId } = useParams();
const history  = useHistory();
const [product] = products.filter(product => product.id === Number(productId));
console.log('product', product);
const [name, setName] = useState(product.name);
const [description, setDescription] = useState(product.description);
const [price, setPrice] = useState(product.price);
const [image, setImage] = useState(product.imageurl);
const [inStock, setInStock] = useState(false);
const [category, setCategory] = useState(product.category);

const handleEdit = async (event, productId) => {
    event.preventDefault();
    try {
    const editedProduct = await callApi({
        url: `/api/products/${productId}`,
        method: 'PATCH',
        token,
        data: {
            name,
            description,
            price: Number(price),
            imageurl: image,
            inStock,
            category
        }
    });  
    console.log('editedProduct,', editedProduct);
    history.push('/admin');
    
    } catch(error) {
     throw error
    }

};

const handleDelete = async (event, productId) => {
    event.preventDefault();
    try {
        const deletedProduct = await callApi({
            url: `/api/products/${productId}`,
            method: 'DELETE',
            token,
        });  
        console.log('deletedProduct,', deletedProduct);
        history.push('/admin/products');
    
       } catch(error) {
         throw error
    }
};

const handleBackToProducts = (event) => {
    event.preventDefault();
    history.push('/admin');
  }

return (
     <div id='admin-product-page'>
 
    <form className='edit-product-form' id='single-product'>
        <h4>Edit product</h4>

        <label htmlFor='product name'>Product: {name}</label>
        <input className='input-field' type='text'
         placeholder='new product name' 
         onChange={e => setName(e.target.value)}>
        </input>

        <label htmlFor='description' id='edit-description'>Description: {description}</label>
        <input className='input-field' type='text'
          placeholder='new description' 
          onChange={e => setDescription(e.target.value)}>
        </input>

        <label htmlFor='price'>Price: {price}</label>
        <input className='input-field' type='text'
         placeholder='new price'
         onChange={e => setPrice(e.target.value)}>
        </input>

        <label htmlFor='imageurl'> new imageurl:</label>
        <input className='input-field' type='text'
          placeholder='new imageurl' 
          onChange={e => setImage(e.target.value)}>
         </input>

         <select id="select" onChange={(e) => {setInStock(e.target.value)}}>
            <option>In Stock?</option>
            <option value={false}>Out of Stock</option>
            <option value={true}>In Stock</option>
        </select>

          <select id="select" onChange={(e) => {setCategory(e.target.value)}}>
            <option>Select A Category</option>
            <option value="Sweet">Sweet</option>
            <option value="Savory">Savory</option>
            <option value="Sweet & Savory">Sweet & Savory</option>
        </select>

    </form>

    <button type="submit"className="button"
     onClick={(e) => handleEdit(e, product.id)}>Edit Product</button>
     
    <button type="submit"className="button"
     onClick={(e) => handleDelete(e, product.id)}>Delete Product</button>

    <button type="submit" className="button"
    onClick={e => handleBackToProducts(e)}>Back to Products</button>
     
    </div>

  );

};

export default EditProduct;

 