import {
  CAPTCHA_NEEDED,
  CAPTCHA_SET,
  CAPTCHA_CANCEL,
  CAPTCHA_SUBMITED
} from '../constants/Captcha';


const initialState = {
  captcha_img: '',
  captcha_sid: '',
  captcha_key: '',
  captcha_params: '',
  func: ''
}

export default function captcha(state = initialState, action) {
  switch (action.type) {
    case CAPTCHA_NEEDED:
      return {...state,
              captcha_img: action.img,
              captcha_sid: action.sid,
              func: action.func
      };

    case CAPTCHA_SET:
      return {...state, captcha_key: action.payload };

    case CAPTCHA_CANCEL:
      return {...state,
              captcha_key: '',
              captcha_img: '',
              captcha_sid: '',
              func: ''
      };

    case CAPTCHA_SUBMITED:
      return {...state,
              captcha_img: '',
              captcha_sid: '',
              captcha_key: '',
              func: ''
      };


    default:
      return state;

  }
}
