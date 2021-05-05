import { ActionTypes } from '../constants/action-types';

const initState = {
  currentUser: null,
};

export const userReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case ActionTypes.LOGIN:
      return {
        currentUser: payload,
      };
    case ActionTypes.LOGOUT:
      return {
        currentUser: null,
      };
    case ActionTypes.UPDATE_ACCOUNT:
      return {
        currentUser: payload,
      };
    case ActionTypes.DELETE_ACCOUNT:
      return {
        currentUser: null,
      };
    default:
      return state;
  };
};
