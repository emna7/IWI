import { ActionTypes, } from '../constants/action-types';

export const searchGigs = (gigs) => {
  return {
    type: ActionTypes.SEACHED_GIGS,
    payload: gigs,
  };
};
