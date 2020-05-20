import { ActionTypes } from '../actions';

const initialState = {
  countryData: [],
  stateData: [],
  stateName: '',

};

const CountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COUNTRY_DATA_OVER_TIME:
      return { countryData: action.payload.data, stateData: state.stateData, stateName: state.stateName };
    case ActionTypes.GET_STATE_DATA_OVER_TIME:
      return { countryData: state.countryData, stateData: action.payload.data, stateName: action.payload.stateName };
    default:
      return state;
  }
};

export default CountReducer;
