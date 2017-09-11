import { combineReducers } from 'redux';
import auth from './auth'
import wall from './wall'

export default combineReducers({
  auth,
  wall
})
