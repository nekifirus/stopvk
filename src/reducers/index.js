import { combineReducers } from 'redux';
import auth from './auth';
import wall from './wall';
import favs from './favs';
import mess from './mess';

export default combineReducers({
  auth,
  wall,
  favs,
  mess
})
