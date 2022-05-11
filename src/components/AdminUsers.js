import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router';

const AdminUsers = ( { users } ) => {
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

      return (
        <div id="users-page">
            <h2>List of Users</h2>

            <h5 id='search-word'>Search: </h5>
            <input id='search-field' type='text' placeholder='search'
             onChange={(e) => { history.push(e.target.value ? `/users?searchTerm=${e.target.value}` : '/users') }}/>
      
         <div>
            {sortedUsers.map(user => {
                return (
                    <div key={user.id} id='single-user'>
                        <h4><u>User Name:</u>
                        <Link to={`/users/${user.id}`}> {user.firstName} {user.lastName}</Link></h4>
                        <h4><u>First name:</u> {user.firstName}</h4>
                        <h4><u>Last name:</u> {user.lastName}</h4>
                        <h4><u>Email:</u> {user.email}</h4>
                        <h4><u>username:</u> {user.username}</h4>
                        <h4><u>Admin? </u> {user.isAdmin}</h4>
                    </div>
                    ) } )} 
         </div>
      
        </div>
      )

}
export default AdminUsers;