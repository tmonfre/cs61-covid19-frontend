import * as countryRequest from '../../services/count-requests';

const ActionTypes = {
  GET_COUNTRY_DATA_OVER_TIME: 'GET_COUNTRY_DATA_OVER_TIME',
  GET_STATE_DATA_OVER_TIME: 'GET_STATE_DATA_OVER_TIME',
  GET_ALL_COUNTY_DATA: 'GET_ALL_COUNTY_DATA',
  GET_ALL_STATE_DATA: 'GET_ALL_STATE_DATA',

  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const getCountry = () => {
  return (dispatch) => {
    countryRequest.getCountryCount()
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
    countryRequest.getStateCount(state)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_STATE_DATA_OVER_TIME, payload: { data: response, stateName: state } });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

const getCounties = () => {
  return (dispatch) => {
    countryRequest.getCountyData()
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
    countryRequest.getStateData()
      .then((response) => {
        dispatch({ type: ActionTypes.GET_ALL_STATE_DATA, payload: { data: response } });
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
  getCounties,
  getStates,
};
