import { ActionTypes } from '../actions';

const initialState = {
  casesOverTime: [],
};

const CountryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COUNTRY_DATA_OVER_TIME:
      return { casesOverTime: action.payload };

    default:
      return state;
  }
};

export default CountryReducer;
