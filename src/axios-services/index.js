import axios from 'axios';
const { SERVER_ADDRESS = 'http://localhost:', PORT = 4000 } = process.env;
const API_URL = process.env.API_URL || SERVER_ADDRESS + PORT;
// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export const callApi = async ({ url, method = "GET", token, data }) => {
  try {
    const options = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      data: data
    };
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }
    const resp = await axios(API_URL + url, options);
    console.log(resp);
    
    if (resp.error) {
      throw resp.error;
    }
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export async function getAPIHealth() {
  try {
    const { data } = await axios.get(`${API_URL}/api/health`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
