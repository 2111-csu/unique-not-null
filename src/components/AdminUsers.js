import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router';
import '../style/User.css';
import { callApi } from '../axios-services';

const AdminUsers = ( { users, token } ) => {
    //const [firstName, setFirstName] = useState('');
    //const [lastName, setLastName] = useState('');
    //const [email, setEmail] = useState('');
    //const [imageurl, setImageUrl] = useState('');
    //const [username, setUsername] = useState('');
    //const [isAdmin, setIsAdmin] = useState(false);

    const { search } = useLocation();
    const history = useHistory();
    const searchParams = new URLSearchParams(search);
    const searchTerm = searchParams.get('searchTerm') || '';
    
      const userMatches = (user, searchTerm) => {
        const { firstName, lastName, email, username } = user;   
        const toCheck = [firstName, lastName, email, username]
        for (const field of toCheck) {
          if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
        }
      }
      console.log('users', users);
      const sortedUsers = users && users.filter(user => userMatches(user, searchTerm));

      const handleEdit = async (event, userId) => {
        event.preventDefault();
        history.push(`/admin/users/${userId}`)
      }

      const deleteUser = async (event, userId) => {
        event.preventDefault();
        try {
          const deletedUser = await callApi({
            url: `/api/users/${userId}`,
            method: "DELETE",
            token
          });
    
          console.log('deleted user', deletedUser);
          history.push('/');
        } catch (error) {
          throw error;
        }
      }

      return (
        <div id="users-page">
            <h2>List of Users</h2>

            <h5 id='search-word'>Search: </h5>
            <input id='search-field' type='text' placeholder='search'
             onChange={(e) => { history.push(e.target.value ? `/admin?searchTerm=${e.target.value}` : '/admin') }}/>
      
         <div>
            {sortedUsers.map(user => {
                return (
                  <div id='user-info' key={user.id}>
                    <p>Name: {user.firstName} {user.lastName}</p>
                    <p>Email Address: {user.email}</p>
                    <p>Username: {user.username}</p>
        
                    {/* <button type="submit" className="button"
                    onClick={e => handleEdit(e, user.id)}>Edit Account</button> */}
                    <button className='button' type='submit' 
                  onClick={(e) => deleteUser(e, user.id)}>Delete User</button>
                  </div>
                    ) } )} 
         </div>
      
        </div>
      )

}
export default AdminUsers;