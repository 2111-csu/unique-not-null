import React, { useState, useEffect } from "react";
import { callApi } from '../axios-services';
import { AdminProducts, AdminOrders, AdminUsers } from "./index";

const Admin = ({ token, setMessage, products, setProducts, orders, setOrders }) => {
  const [users, setUsers] = useState([]);
  const [isProducts, setIsProducts] = useState(true);
  const [isOrders, setIsOrders] = useState(false);
  const [isUsers, setIsUsers] = useState(false);

  const getProducts = async () => {
    const apiResponse = await callApi({url: '/api/products', method: 'GET'});
    console.log(apiResponse);
    console.log(apiResponse.data);
    setProducts(apiResponse.data);
  }

  useEffect(() => {  
    getProducts();
  }, [setProducts]);

  const getOrders = async () => {
    const apiResponse = await callApi({url: '/api/orders', method: 'GET', token});
    console.log(apiResponse);
    console.log(apiResponse.data);
    setOrders(apiResponse.data);
  }

  useEffect(() => {
    getOrders();
  }, [setOrders]);

  const getUsers = async () => {
    const apiResponse = await callApi({url: '/api/users', method: 'GET', token});
    console.log(apiResponse);
    console.log(apiResponse.data);
    setUsers(apiResponse.data);
  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);


  const clickProducts = (event) => {
    event.preventDefault();
    setIsOrders(false);
    setIsUsers(false);
    setIsProducts(true);  
  }

  const clickOrders = (event) => {
    event.preventDefault();
    setIsProducts(false);
    setIsUsers(false);
    setIsOrders(true);
  }
  const clickUsers = (event) => {
    event.preventDefault();
    setIsProducts(false)
    setIsOrders(false)
    setIsUsers(true);
  }

  return <>
    
    <h1>Admin</h1>
    <div id='admin-page'>
      
      <button className='button' type='submit' onClick={clickProducts}>All Products</button>
      <button className='button' type='submit' onClick={clickOrders}>All Orders</button>
      <button className='button' type='submit' onClick={clickUsers}>All Users</button>
    </div>
    {isProducts? <AdminProducts products={products} setProducts={setProducts} token={token}/> : null}
    {isOrders? <AdminOrders token={token} orders={orders} setOrders={setOrders} getOrders={getOrders}/> : null}
    {isUsers? <AdminUsers token={token} users={users} setUsers={setUsers} getUsers={getUsers}/> : null}
  </>
};

export default Admin;