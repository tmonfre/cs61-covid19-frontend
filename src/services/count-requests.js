import axios from 'axios';
import { API_URL } from '../constants';

const URL = `${API_URL}/counts`;

/**
 * gets the data for the country line graph
 */
const getCountryCounts = () => {
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
const getStateCounts = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/states`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export {
  getCountryCounts,
  getStateCounts,
};
