import { ActionTypes } from '../constants/action-types';

const initState = null;

export const userReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case ActionTypes.LOGIN:
      return payload;
    case ActionTypes.LOGOUT:
      return null;
    case ActionTypes.UPDATE_ACCOUNT:
      return payload;
    case ActionTypes.DELETE_ACCOUNT:
      return null;
    default:
      return state;
  };
};
