import { combineReducers } from 'redux';
import auth from './auth';
import wall from './wall';
import favs from './favs';
import mess from './mess';
import groups from './groups';
import friends from './friends';

export default combineReducers({
  auth,
  wall,
  favs,
  mess,
  groups,
  friends
})
