import React, { useState } from 'react';
import { callApi } from "../axios-services";
import { useParams, useHistory } from 'react-router-dom';
import "../style/App.css";

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
 };
    
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
    };
    const handleBackToAccount = (event) => {
        event.preventDefault();
        history.push('/account');
      }

    const handleBackToHome = (event) => {
        event.preventDefault();
        history.push('/');
      }
    
    return (
        <div id='container'>
        <div className='edit-user-form' id='edit-user'>
        <form >
            <h4>Edit A User</h4>
            
            <label htmlFor='firstname'>First Name: </label>
            <input className='input-field' type='text'
             placeholder={loggedIn.firstName} value={firstName}
             onChange={e => setFirstName(e.target.value)}>
            </input>
            <br />

            <label htmlFor='lastname'>Last Name: </label>
            <input className='input-field' type='text'
              placeholder={loggedIn.lastName} value={lastName}
              onChange={e => setLastName(e.target.value)}>
            </input>
            <br />

            <label htmlFor='email'>Email Address: </label>
            <input className='input-field' type='text'
             placeholder={loggedIn.email} value={email}
             onChange={e => setEmail(e.target.value)}>
            </input>
            <br />
    
            <label htmlFor='username'>Username: </label>
            <input className='input-field' type='text'
            placeholder={loggedIn.username} value={username}
            onChange={e => setUsername(e.target.value)}>
            </input>
            <br />
        </form>
    
        <button type="submit"className="button"
         onClick={(e) => handleEdit(e)}>Edit User</button>
         
        <button type="submit"className="button"
         onClick={(e) => handleDelete(e, userToEdit.id)}>Delete User</button>
         
         </div>
         <button type="submit" className="button" 
         onClick={e => handleBackToAccount(e)}>Back My Account</button>

         <button type="submit" className="button" 
         onClick={e => handleBackToHome(e)}>Back to Home</button>
        
       
        </div>
    
    );
    
    };
    
    export default EditUser;
    
    /* 
    
    <input className='input-field' type='text'
    placeholder='image' value={imageurl}
    onChange={e => setImageurl(e.target.value)}>
    </input> 
    
    <input className='input-field' type='text'
     placeholder={'enter new password'} value={password}
     onChange={e => setPassword(e.target.value)}>
    </input> 

   <input className='input-field' type='text'
    placeholder='isAdmin' value={isAdmin}
    onChange={e => setIsAdmin(e.target.value)}>
    </input> 
    
    */