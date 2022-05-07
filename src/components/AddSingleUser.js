import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { callApi } from "../axios-services";

const AddSingleUser = ( {token} ) => {

    const history  = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [imageurl, setImageurl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const newUser = await callApi({
            url: `/api/users`,
            method: 'POST',
            token,
            data: {
                firstName,
                lastName,
                email,
                imageurl,
                username,
                password,
                isAdmin  
            }
        });  
        console.log('newUser,', newUser);
        history.push('/admin/users');
        
        } catch(error) {
          throw error
          }
    };

    return (
        <div id='admin-user-page'>
        <form className='add-user-form' onSubmit={handleSubmit}>
            <h4>Create a user:</h4>
            
            <input className='input-field' type='text'
             placeholder='first name' value={firstName}
             onChange={e => setFirstName(e.target.value)}>
            </input>
    
            <input className='input-field' type='text'
              placeholder='last name' value={lastName}
              onChange={e => setLastName(e.target.value)}>
            </input>
    
            <input className='input-field' type='text'
             placeholder='email' value={email}
             onChange={e => setEmail(e.target.value)}>
            </input>
    
            <input className='input-field' type='text'
              placeholder='image' value={imageurl}
              onChange={e => setImageurl(e.target.value)}>
             </input>
    
             <input className='input-field' type='text'
              placeholder='username'value={username}
              onChange={e => setUsername(e.target.value)}>
              </input>
    
            <input className='input-field' type='text'
             placeholder='password' value={password}
             onChange={e => setPassword(e.target.value)}>
             </input>

             <input className='input-field' type='text'
             placeholder='isAdmin' value={isAdmin}
             onChange={e => setIsAdmin(e.target.value)}>
             </input>
    
        </form>
    
        <button type="submit"className="button">Create User</button>

        </div>
    
    );


}

export default AddSingleUser;