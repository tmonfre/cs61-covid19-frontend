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
 * gets all of the state data
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
/**
 * gets all of the county data
 */
const getCountyCount = (countyId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/counties/${countyId}`)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const getCountyData = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/county/data/`)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const getStateData = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/state/data/`)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const createCaseCount = (token, countyID, date, fields) => {
  return new Promise((resolve, reject) => {
    axios.post(`${URL}/set/${countyID}/${date}`, fields, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const updateCaseCount = (token, countyID, date, fields) => {
  return new Promise((resolve, reject) => {
    axios.put(`${URL}/set/${countyID}/${date}`, fields, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const deleteCaseCount = (token, countyID, date) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${URL}/set/${countyID}/${date}`, { headers: { Authorization: `Bearer ${token}` } })
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
  getCountyData,
  getStateData,
  getCountyCount,
  createCaseCount,
  updateCaseCount,
  deleteCaseCount,
};
