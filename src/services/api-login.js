import axios from 'axios';

const URL = 'http://localhost:3000/api/authentication/login';

// creates an authorization header to attach to request
const generateHeaders = (username, password) => {
  const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  return {
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
};

/**
 * authenticate with server and get auth token
 * @param {string} username user's username for auth
 * @param {string} password user's password for auth
 */
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    axios.get(URL, generateHeaders(username, password))
      .then((response) => {
        resolve(response.data.response.token);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export default login;
