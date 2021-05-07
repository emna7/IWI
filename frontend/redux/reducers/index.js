import { combineReducers } from 'redux';
import { userReducer, } from './userReducer';
import { eventsReducer, } from './eventsReducer';
import { gigReducer, } from './gigReducer';
import { clubReducer, } from './clubReducer';
import { selectedEventReducer, } from './selectedEventReducer';

const reducers = combineReducers({
  currentUser: userReducer,
  events: eventsReducer,
  gigs: gigReducer,
  clubs: clubReducer,
  selectedEvent: selectedEventReducer,
});

export default reducers;
