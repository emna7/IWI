import { ActionTypes } from '../constants/action-types';

export const login = (user_data) => {
  return {
    type: ActionTypes.LOGIN,
    payload: user_data,
  };
};

export const logout = () => {
  return {
    type: ActionTypes.LOGOUT,
  };
};

export const signUp = (user_data) => {
  return {
    type: ActionTypes.SIGN_UP,
    payload: user_data,
  };
};

export const updateUser = (user_data) => {
  return {
    type: ActionTypes.UPDATE_ACCOUNT,
    payload: user_data,
  };
};

export const deleteUser = () => {
  return {
    type: ActionTypes.DELETE_ACCOUNT,
  };
};
