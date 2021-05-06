import { ActionTypes } from '../constants/action-types';

const initState = [];

export const gigReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case ActionTypes.SEARCHED_GIGS:
      return payload;
    default:
      return state;
  };
};
