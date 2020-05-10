import axios from 'axios';
import { API_URL, LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USERNAME_KEY } from '../constants';

const URL = `${API_URL}/authentication`;

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
const signIn = (username, password) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/login`, generateHeaders(username, password))
      .then((response) => {
        resolve(response.data.response.token);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const signOut = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
};

/**
 * create user object in the database
 * @param {string} token auth token
 * @param {object} fields values for the new user
 */
const signUp = (fields) => {
  return new Promise((resolve, reject) => {
    axios.post(`${URL}/sign-up`, fields, generateHeaders(fields.UserName, fields.Password))
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export {
  signIn,
  signOut,
  signUp,
};
