import { combineReducers } from 'redux';
import { userReducer, } from './userReducer';

const reducers = combineReducers({
  currentUser: userReducer,
});

export default reducers;
