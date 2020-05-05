import axios from 'axios';

const URL = 'http://localhost:3000/api/employees';

/**
 * retrieve all employee objects in the database
 * @param {string} token auth token
 */
const getAllEmployees = (token) => {
  return new Promise((resolve, reject) => {
    axios.get(URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

/**
 * retrieve single employee object by username
 * @param {string} token auth token
 * @param {string} username username to retrieve
 */
const getEmployeeByUsername = (token, username) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/${username}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

/**
 * create employee object in the database
 * @param {string} token auth token
 * @param {object} fields values for the new employee
 */
const createEmployee = (token, fields) => {
  return new Promise((resolve, reject) => {
    axios.post(URL, fields, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

/**
 * update employee object by username
 * @param {string} token auth token
 * @param {string} username the username to update in the database
 * @param {object} fields values to change for the employee
 */
const updateEmployee = (token, username, fields) => {
  return new Promise((resolve, reject) => {
    axios.put(`${URL}/${username}`, fields, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

/**
 * delete employee object by username
 * @param {string} token auth token
 * @param {string} username the username to delete in the database
 */
const deleteEmployee = (token, username) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${URL}/${username}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export {
  getAllEmployees,
  getEmployeeByUsername,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
