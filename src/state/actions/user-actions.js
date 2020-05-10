import * as userRequests from '../../services/user-requests';
import * as authRequests from '../../services/auth-requests';
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USERNAME_KEY } from '../../constants';

const ActionTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  CLEAR_USER_DATA: 'CLEAR_USER_DATA',
  SET_TOKEN: 'SET_TOKEN',

  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const signIn = (username, password, success, failure) => {
  return (dispatch) => {
    authRequests.signIn(username, password)
      .then((token) => {
        dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
        localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, username);

        userRequests
          .getUser(token, username)
          .then((response) => {
            dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });

            // call user success callback
            if (success) {
              success(token);
            }
          })
          .catch((error) => {
            dispatch({ type: ActionTypes.API_ERROR, payload: error });

            // call user failure callback
            if (failure) {
              failure(error);
            }
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });

        // call user failure callback
        if (failure) {
          failure(error);
        }
      });
  };
};

const signOut = () => {
  return (dispatch) => {
    authRequests.signOut();
    dispatch({ type: ActionTypes.SET_TOKEN, payload: '' });
    dispatch({ type: ActionTypes.CLEAR_USER_DATA, payload: {} });
  };
};

// make an asyncronous request to the server to get the user object
const getUser = (token, username) => {
  return (dispatch, getState) => {
    userRequests
      .getUser(token || getState().user.token, username)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });

        // store token if user wanted to update that
        if (token) {
          dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const createUser = (fields, signInAfterCreate, success, failure) => {
  return (dispatch) => {
    authRequests
      .signUp(fields)
      .then(() => {
        if (signInAfterCreate) {
          authRequests.signIn(fields.UserName, fields.Password)
            .then((token) => {
              dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
              localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
              localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, fields.Username);

              userRequests
                .getUser(token, fields.UserName)
                .then((response) => {
                  dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });

                  // call user success callback
                  if (success) {
                    success(token);
                  }
                })
                .catch((error) => {
                  dispatch({ type: ActionTypes.API_ERROR, payload: error });

                  // call user failure callback
                  if (failure) {
                    failure(error);
                  }
                });
            })
            .catch((error) => {
              dispatch({ type: ActionTypes.API_ERROR, payload: error });

              // call user failure callback
              if (failure) {
                failure(error);
              }
            });
        } else if (success) {
          // call user success callback
          success();
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// make an asyncronous request to the server to update user fields, then get the user data
const updateUser = (fields) => {
  return (dispatch, getState) => {
    userRequests
      .updateUser(getState().user.token, fields)
      .then((updatedUser) => {
        userRequests
          .getUser(getState().user.token, updatedUser.UserName)
          .then((response) => {
            dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });
          })
          .catch((error) => {
            dispatch({ type: ActionTypes.API_ERROR, payload: error });
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const deleteUser = (username) => {
  return (dispatch, getState) => {
    userRequests
      .deleteUser(getState().user.token, username)
      .then(() => {
        dispatch({ type: ActionTypes.CLEAR_USER_DATA, payload: {} });
        dispatch({ type: ActionTypes.SET_TOKEN, payload: '' });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const clearUserData = () => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_USER_DATA, payload: {} });
  };
};


export {
  ActionTypes,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  clearUserData,
  signIn,
  signOut,
};
