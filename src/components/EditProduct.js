import React, { useState } from 'react';
import { callApi } from "../axios-services";
import { useParams, useHistory } from 'react-router-dom';
//import AllProducts from './AllProducts';

const EditProduct = ({ token, products }) => { 

const { productId } = useParams();
const history  = useHistory();
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState('');
const [inStock, setInStock] = useState(false);
const [category, setCategory] = useState('');  //do we need this?

const productToEdit = products.filter(product => product.id === productId)
//const [productToEdit] = products.filter(product => product.id === Nunber(productId))

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
    history.push('/admin/products');
    
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
    <form className='create-product-container'>
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

    </form>

    <button type="submit"className="button"
     onClick={(e) => handleEdit(e, productToEdit.id)}>Edit Product</button>
     
    <button type="submit"className="button"
     onClick={(e) => handleDelete(e, productToEdit.id)}>Delete Product</button>
     
    </div>

);

};

export default EditProduct;

/* 


*/