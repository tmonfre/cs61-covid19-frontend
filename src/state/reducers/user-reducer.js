import { ActionTypes } from '../actions';

const initialState = {
  token: '',
  user: {},
};

const UserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return { ...state, user: action.payload };

    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };

    case ActionTypes.CLEAR_USER_DATA:
      return { ...state, user: {}, token: '' };

    default:
      return state;
  }
};

export default UserInfoReducer;
