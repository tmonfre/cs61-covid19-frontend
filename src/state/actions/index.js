// import all actions and action types from various action files

import {
  ActionTypes as userActionTypes,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  clearUserData,
  getAllUsers,
  signIn,
  signOut,
} from './user-actions';
import {
  ActionTypes as countActionTypes,
  getCountry,
  getState,
  getCounty,
  getCounties,
  getStates,
  createCaseCount,
  updateCaseCount,
  deleteCaseCount,
} from './count-actions';

// combine all action types
const ActionTypes = {};

Object.keys(userActionTypes).forEach((key) => {
  ActionTypes[key] = userActionTypes[key];
});
Object.keys(countActionTypes).forEach((key) => {
  ActionTypes[key] = countActionTypes[key];
});

// export all action types in one object, as well as each action
export {
  ActionTypes,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  clearUserData,
  getAllUsers,
  signIn,
  signOut,
  getCountry,
  getState,
  getCounties,
  getStates,
  getCounty,
  createCaseCount,
  updateCaseCount,
  deleteCaseCount,
};
