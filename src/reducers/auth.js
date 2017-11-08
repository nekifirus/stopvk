import {
  AUTHLINK_SET,
  AUTHLINK_PUSH,
  AUTHLINK_FAIL,
  AUTHLINK_SUCCESS,

  APPID_SET,
  APPID_PUSH,

  LOGOUT
} from '../constants/Auth'



const initialState = {
  user_id: '',
  access_token: '',
  expires_in: '0',
  isValid: false,
  error: false,
  link: '',
  id: '',
  authlink: '',
  info: {
    first_name: '',
    last_name: '',
    photo_50: ''
  }
}


export default function auth(state = initialState, action) {
  switch (action.type) {

    case AUTHLINK_SET:
      return { ...state,
        link: action.link,
        isValid: action.isValid,
        error: action.error
      }

    case AUTHLINK_PUSH: {
      return { ...state,
        user_id: action.auth.user_id,
        access_token: action.auth.access_token,
        expires_in: action.auth.expires_in,
        error: ''
      }
    }

    case AUTHLINK_FAIL: {
      return { ...state,
      error: action.payload
      }
    }

    case AUTHLINK_SUCCESS: {
      return { ...state,
        info: action.payload

      }
    }

    case APPID_SET:
      return { ...state, id: action.payload }

    case APPID_PUSH:
      return { ...state, authlink: action.payload }


    case LOGOUT:
      return {...state, user_id: '', access_token: '', info: ''}

    default:
      return state
  }
}
