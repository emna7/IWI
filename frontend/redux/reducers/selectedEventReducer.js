import { ActionTypes } from '../constants/action-types';

const initState = null;

export const selectedEventReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case ActionTypes.SELECTED_EVENT:
      return payload;
    default:
      return state;
  };
};
