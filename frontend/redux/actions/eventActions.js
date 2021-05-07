import { ActionTypes, } from '../constants/action-types';

export const searchEvents = (events) => {
  return {
    type: ActionTypes.SEARCHED_EVENTS,
    payload: events,
  };
};

export const selectEvent = (event) => {
  return {
    type: ActionTypes.SELECTED_EVENT,
    payload: event,
  };
};

