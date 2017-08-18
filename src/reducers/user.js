import {
  LOGIN_FAIL,
  USER_INFO_SUCCESS,
  LOGOUT
} from '../constants/User';

const initialState = {
  info: '',
  auth: false,
  error: ''
}

export default function user(state = initialState, action) {

  switch(action.type) {
    
    case LOGIN_FAIL:
      return { ...state, error: action.payload.message }

    case USER_INFO_SUCCESS:
      return { ...state, info: action.payload, auth: true }

    case LOGOUT:
      return { ...state, info: '', auth: false }

    default:
      return state
  }
}