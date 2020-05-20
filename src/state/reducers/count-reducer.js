import { ActionTypes } from '../actions';

const initialState = {
  countryData: [],
  stateData: [],

};

const CountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COUNTRY_DATA_OVER_TIME:
      return { countryData: action.payload, stateData: state.stateData };
    case ActionTypes.GET_STATE_DATA_OVER_TIME:
      return { countryData: state.countryData, stateData: action.payload };
    default:
      return state;
  }
};

export default CountReducer;
