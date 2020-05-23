import * as dataRequest from '../../services/count-requests';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../constants';

const ActionTypes = {
  GET_COUNTRY_DATA_OVER_TIME: 'GET_COUNTRY_DATA_OVER_TIME',
  GET_STATE_DATA_OVER_TIME: 'GET_STATE_DATA_OVER_TIME',
  GET_COUNTY_DATA_OVER_TIME: 'GET_COUNTY_DATA_OVER_TIME',
  GET_ALL_COUNTY_DATA: 'GET_ALL_COUNTY_DATA',
  GET_ALL_STATE_DATA: 'GET_ALL_STATE_DATA',
  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const getCountry = () => {
  return (dispatch) => {
    dataRequest.getCountryCount()
      .then((response) => {
        dispatch({ type: ActionTypes.GET_COUNTRY_DATA_OVER_TIME, payload: { data: response, stateName: '' } });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const getState = (state) => {
  return (dispatch) => {
    dataRequest.getStateCount(state)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_STATE_DATA_OVER_TIME, payload: { data: response, stateName: state } });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};
const getCounty = (county) => {
  return (dispatch) => {
    dataRequest.getCountyCount(county)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_COUNTY_DATA_OVER_TIME, payload: { data: response, countyID: county } });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const getCounties = () => {
  return (dispatch) => {
    dataRequest.getCountyData()
      .then((response) => {
        dispatch({ type: ActionTypes.GET_ALL_COUNTY_DATA, payload: { data: response } });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const getStates = () => {
  return (dispatch) => {
    dataRequest.getStateData()
      .then((response) => {
        dispatch({ type: ActionTypes.GET_ALL_STATE_DATA, payload: { data: response } });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const createCaseCount = (countyID, date, fields) => {
  return (dispatch) => {
    dataRequest
      .createCaseCount(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY), countyID, date, fields)
      .then(() => {
        dataRequest.getCountyCount(countyID)
          .then((response) => {
            dispatch({ type: ActionTypes.GET_COUNTY_DATA_OVER_TIME, payload: { data: response, countyID } });
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

const updateCaseCount = (countyID, date, fields) => {
  return (dispatch) => {
    dataRequest
      .updateCaseCount(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY), countyID, date, fields)
      .then(() => {
        dataRequest.getCountyCount(countyID)
          .then((response) => {
            dispatch({ type: ActionTypes.GET_COUNTY_DATA_OVER_TIME, payload: { data: response, countyID } });
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

const deleteCaseCount = (countyID, date) => {
  return (dispatch) => {
    dataRequest
      .deleteCaseCount(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY), countyID, date)
      .then(() => {
        dataRequest.getCountyCount(countyID)
          .then((response) => {
            dispatch({ type: ActionTypes.GET_COUNTY_DATA_OVER_TIME, payload: { data: response, countyID } });
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

export {
  ActionTypes,
  getCountry,
  getState,
  getCounty,
  getCounties,
  getStates,
  createCaseCount,
  updateCaseCount,
  deleteCaseCount,
};
