import { ActionTypes, } from '../constants/action-types';

export const searchGigs = (gigs) => {
  return {
    type: ActionTypes.SEARCHED_GIGS,
    payload: gigs,
  };
};
