import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CHECK_STATUS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  LOGOUT
} from '../constants/User';





function getUserInfo(dispatch, getState) {

}


const VKAuthLOGIN = function(dispatch) {


  VK.Auth.login((r) => { // eslint-disable-line no-undef
    if (r.session) {
      let id = r.session.mid;
      getUserInfo(dispatch, id)

      dispatch({
        type: LOGIN_SUCCESS,

      })


    } else {
      dispatch({
        type: LOGIN_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      })
    }
  }, 8196);
}


export function handleLogin() {
  return function(dispatch) {

    dispatch({
      type: LOGIN_REQUEST
    })

    VKAuthLOGIN(dispatch);
  }
}



export function handleLogout() {
  return function(dispatch) {

    VK.Auth.logout()  // eslint-disable-line no-undef
    dispatch({
      type: LOGOUT,
      payload: ''
    })
  }
}

export function handleCheckstatus() {
  return function(dispatch) {

    dispatch({
      type: CHECK_STATUS
    })


    VK.Auth.getLoginStatus((r) => {   // eslint-disable-line no-undef
      if (r.status === 'connected') {
        let id = r.session.mid;
        getUserInfo(dispatch, id)
        //VKAuthLOGIN(dispatch);

      }
    })
  }

}
