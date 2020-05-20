import axios from 'axios';
import { API_URL } from '../constants';

const URL = `${API_URL}/counts`;

/**
 * gets the data for the country line graph
 */
const getCountryCount = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/country`)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
/**
 * gets all of the state data if we want that?
 */
const getStateCount = (state) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/states/${state}`)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export {
  getCountryCount,
  getStateCount,
};
