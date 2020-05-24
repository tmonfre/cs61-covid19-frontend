const API_URL = 'http://localhost:3000/api';
const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_USERNAME_KEY = 'username';

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  STATE: '/state/:statename',
  ADMIN: '/admin',
};

export {
  API_URL,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USERNAME_KEY,
  ROUTES,
};
