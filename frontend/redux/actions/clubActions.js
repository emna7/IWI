import { ActionTypes, } from '../constants/action-types';

export const SearchClubs = (clubs) => {
  return {
    type: ActionTypes.SEARCHED_EVENTS,
    payload: clubs,
  };
};
