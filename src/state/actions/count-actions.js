import * as countryRequest from '../../services/count-requests';

const ActionTypes = {
  GET_COUNTRY_DATA_OVER_TIME: 'GET_COUNTRY_DATA_OVER_TIME',
  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const getCountries = () => {
  return (dispatch) => {
    countryRequest.getCountryCounts()
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.GET_COUNTRY_DATA_OVER_TIME, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

export {
  ActionTypes,
  getCountries,
};
