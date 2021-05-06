import { combineReducers } from 'redux';
import { userReducer, } from './userReducer';
import { eventReducer, } from './eventReducer';
import { gigReducer, } from './gigReducer';
import { clubReducer, } from './clubReducer';

const reducers = combineReducers({
  currentUser: userReducer,
  events: eventReducer,
  gigs: gigReducer,
  clubs: clubReducer,
});

export default reducers;
