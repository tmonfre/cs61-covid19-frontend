import { ActionTypes } from '../actions';

const initialState = {
  token: '',
  user: {},
  allUsers: [],
};

const UserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return { ...state, user: action.payload };

    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };

    case ActionTypes.CLEAR_USER_DATA:
      return { ...state, user: {}, token: '' };

    case ActionTypes.SET_ALL_USERS:
      return { ...state, allUsers: action.payload };

    default:
      return state;
  }
};

export default UserInfoReducer;
