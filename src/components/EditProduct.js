import React, { useState } from 'react';
import { callApi } from "../axios-services";
import { useParams, useHistory } from 'react-router-dom';
//import AllProducts from './AllProducts';

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

}//handleEdit close

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

}//handleDelete close

return (
    <div id='admin-product-page'>
    <form className='edit-product-form'>
        <h4>Edit product:</h4>
        
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
     
    </div>

);

};

export default EditProduct;

/* 


*/