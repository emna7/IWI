import { ActionTypes } from '../constants/action-types';

const initState = [];

export const clubReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case ActionTypes.SEARCHED_CLUBS:
      return payload;
    default:
      return state;
  };
};
