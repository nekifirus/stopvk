import { combineReducers } from 'redux';
import auth from './auth'
import wall from './wall'
import favs from './favs'

export default combineReducers({
  auth,
  wall,
  favs
})
