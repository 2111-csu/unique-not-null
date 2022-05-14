import React, { useState } from 'react';
import { callApi } from "../axios-services";
import { useParams, useHistory } from 'react-router-dom';

const EditUser = ({ token, loggedIn, setLoggedIn }) => { 

   const { userId } = useParams();
   const history  = useHistory();
   const userToEdit = loggedIn;
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [imageurl, setImageurl] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [isAdmin, setIsAdmin] = useState(false);
    
    
    //const [userToEdit] = users.filter(user => user.id === Nunber(userId))
    
    const handleEdit = async (event) => {
        event.preventDefault();
        try {
        const editedUser= await callApi({
            url: `/api/users/${userId}`,
            method: 'PATCH',
            token,
            data: {
                firstName,
                lastName,
                email,
                username,
                password,
            }
        });  
        console.log('editedUser,', editedUser);
        setLoggedIn(editedUser.data.updatedUser);
        history.push('/account');
        
       } catch(error) {
         throw error
    }
    
    }//handleEdit close
    
    const handleDelete = async (event, userId) => {
        event.preventDefault();
        try {
            const deletedUser = await callApi({
                url: `/api/users/${userId}`,
                method: 'DELETE',
                token,
            });  
            console.log('deletedUser,', deletedUser);
            history.push('/admin/users');
        
           } catch(error) {
             throw error
        }
    
    }//handleDelete close
    
    return (
        <div id='admin-user-page'>
        <form className='edit-user-form'>
            <h4>Edit a user:</h4>
            
            <input className='input-field' type='text'
             placeholder={loggedIn.firstName} value={firstName}
             onChange={e => setFirstName(e.target.value)}>
            </input>
    
            <input className='input-field' type='text'
              placeholder={loggedIn.lastName} value={lastName}
              onChange={e => setLastName(e.target.value)}>
            </input>
    
            <input className='input-field' type='text'
             placeholder={loggedIn.email} value={email}
             onChange={e => setEmail(e.target.value)}>
            </input>
    
            {/* <input className='input-field' type='text'
              placeholder='image' value={imageurl}
              onChange={e => setImageurl(e.target.value)}>
             </input> */}
    
             <input className='input-field' type='text'
              placeholder={loggedIn.username} value={username}
              onChange={e => setUsername(e.target.value)}>
              </input>
    
            <input className='input-field' type='text'
             placeholder={'enter new password'} value={password}
             onChange={e => setPassword(e.target.value)}>
             </input>

             {/* <input className='input-field' type='text'
             placeholder='isAdmin' value={isAdmin}
             onChange={e => setIsAdmin(e.target.value)}>
             </input> */}
    
        </form>
    
        <button type="submit"className="button"
         onClick={(e) => handleEdit(e)}>Edit User</button>
         
        <button type="submit"className="button"
         onClick={(e) => handleDelete(e, userToEdit.id)}>Delete User</button>
         
        </div>
    
    );
    
    };
    
    export default EditUser;
    