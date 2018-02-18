import user from './user';
import fetching from './fetching';
import api from './api';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  fetching,
  api
});