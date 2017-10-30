import {
  AUTHLINK_SET,
  AUTHLINK_PUSH,
  AUTHLINK_FAIL,
  AUTHLINK_SUCCESS
} from '../constants/Auth'

const back = {
  user_id: '1518656',
  access_token: '04e3bed827679e9412156404da1471471031c8357ea6fd3e64ee8439eae83dd15904b655ff8f86bdadc02',
  info: {
    first_name: 'Никита',
    last_name: 'Мистюков',
    photo_50: 'https://pp.userapi.com/c627127/v627127656/33d3d/yj6GBDhYK7k.jpg'
  }
}

const initialState = {
  user_id: '1518656',
  access_token: '04e3bed827679e9412156404da1471471031c8357ea6fd3e64ee8439eae83dd15904b655ff8f86bdadc02',
  expires_in: '0',
  isValid: false,
  error: false,
  link: '',
  info: {
    first_name: 'Никита',
    last_name: 'Мистюков',
    photo_50: 'https://pp.userapi.com/c627127/v627127656/33d3d/yj6GBDhYK7k.jpg'
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

    default:
      return state
  }
}
