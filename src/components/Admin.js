import React, { useState, useEffect } from "react";
import { callApi } from '../axios-services';
import { AdminProducts, AdminOrders, AdminUsers } from "./index";

const Admin = ({ token, setMessage, products, setProducts, orders, setOrders }) => {
  const [users, setUsers] = useState([]);
  const [isProducts, setIsProducts] = useState(true);
  const [isOrders, setIsOrders] = useState(false);
  const [isUsers, setIsUsers] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await callApi({url: '/api/products', method: 'GET'});
      console.log(apiResponse);
      console.log(apiResponse.data);
      setProducts(apiResponse.data);
    }
    getData();
  }, [setProducts]);

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await callApi({url: '/api/orders', method: 'GET', token});
      console.log(apiResponse);
      console.log(apiResponse.data);
      setOrders(apiResponse.data);
    }
    getData();
  }, [setOrders]);

  useEffect(() => {
    const getUsers = async () => {
      const apiResponse = await callApi({url: '/api/users', method: 'GET', token});
      console.log(apiResponse);
      console.log(apiResponse.data);
      setUsers(apiResponse.data);
    }
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
    <div id='admin-page'>
      <h1>Admin</h1>
      <button className='button' type='submit' onClick={clickProducts}>All Products</button>
      <button className='button' type='submit' onClick={clickOrders}>All Orders</button>
      <button className='button' type='submit' onClick={clickUsers}>All Users</button>
    </div>
    {isProducts? <AdminProducts products={products} setProducts={setProducts}/> : null}
    {isOrders? <AdminOrders token={token} orders={orders} setOrders={setOrders}/> : null}
    {isUsers? <AdminUsers token={token} users={users} setUsers={setUsers} /> : null}
  </>
}

export default Admin;