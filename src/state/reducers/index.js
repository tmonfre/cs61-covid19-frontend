import { combineReducers } from 'redux';

import UserReducer from './user-reducer';
import CountReducer from './count-reducer';


const rootReducer = combineReducers({
  user: UserReducer,
  counts: CountReducer,
});

export default rootReducer;
