import { ActionTypes } from '../actions';

const initialState = {
  countryData: [],
  stateData: [],
  stateName: '',
  cumCountyData: [],
  cumStateData: [],
};

const CountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COUNTRY_DATA_OVER_TIME:
      return { ...state, countryData: action.payload.data };
    case ActionTypes.GET_STATE_DATA_OVER_TIME:
      return { ...state, stateData: action.payload.data, stateName: action.payload.stateName };
    case ActionTypes.GET_ALL_COUNTY_DATA:
      return { ...state, cumCountyData: action.payload.data };
    case ActionTypes.GET_ALL_STATE_DATA:
      return { ...state, cumStateData: action.payload.data };
    default:
      return state;
  }
};

export default CountReducer;
