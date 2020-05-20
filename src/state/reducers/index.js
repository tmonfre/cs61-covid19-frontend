import { combineReducers } from 'redux';

import UserReducer from './user-reducer';
import CountryReducer from './country-reducer';


const rootReducer = combineReducers({
  user: UserReducer,
  country: CountryReducer,
});

export default rootReducer;
