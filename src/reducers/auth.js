import {
  AUTHLINK_SET,
  AUTHLINK_PUSH
} from '../constants/Auth'

const initialState = {
  user_id: '',
  access_token: '',
  expires_in: '',
  isValid: false,
  error: false,
  link: ''
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

    default:
      return state
  }
}
