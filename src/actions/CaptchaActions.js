import {
  CAPTCHA_SET,
  CAPTCHA_CANCEL,
  CAPTCHA_SUBMITED
} from '../constants/Captcha';

export function setCaptcha(captcha_key) {
  return { type: CAPTCHA_SET, payload: captcha_key };
};

export function cancelCaptcha(){
  return { type: CAPTCHA_CANCEL };
};

export function submitCaptcha() {
  return function(dispatch, getState) {
    const state = getState();
    var
      func = state.captcha.func,
      sid = state.captcha.captcha_sid,
      key = state.captcha.captcha_key;

    let storage = sessionStorage;

    storage.setItem("sid", sid);
    storage.setItem("key", key);

    dispatch({
      type: CAPTCHA_SUBMITED
    });

    (func())(dispatch, getState)

  };
};
