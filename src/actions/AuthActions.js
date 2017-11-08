
import {
  AUTHLINK_SET,
  AUTHLINK_PUSH,
  AUTHLINK_FAIL,
  AUTHLINK_SUCCESS,

  APPID_SET,
  APPID_PUSH,

  LOGOUT
} from '../constants/Auth'
import jsonp from 'jsonp'

import {setData, getToken, getUserId, removeAuth} from '../Utils/Storage';


var auth = {
  'user_id': '',
  'access_token': '',
  'expires_in': ''
}




export function initAuth () {
  return function(dispatch, getState) {
    const
      state = getState(),
      auth = state.auth;


    let token = getToken();
    let user_id = getUserId();

    if(token && user_id) {
      auth.user_id = user_id;
      auth.access_token = token;
      dispatch({type: AUTHLINK_PUSH, auth})

      getUserInfo(dispatch, getState)
    }

  }
}



export function getUserInfo(dispatch, getState) {

  const state = getState()
  const auth = state.auth


  jsonp(`https://api.vk.com/method/users.get?user_ids=${auth.user_id}&fields=photo_50&v=5.68`,

   function(err, data) {
    if (err) {
      dispatch({
        type: AUTHLINK_FAIL,
        payload: err
      })
    }
    if (data) {
      dispatch({
        type: AUTHLINK_SUCCESS,
        payload: data.response[0]
      })
    }
  })


}


function checkLink(link) {
  let
    a = ~link.indexOf('user_id'),
    b = ~link.indexOf('access_token'),
    c = ~link.indexOf('expires_in');



  return (a) && (b) && (c)
}

export function setLink(link) {
  return (dispatch) => {
    let isValid, error

    if (checkLink(link)) {
      isValid = true
      error = ''
    } else {
      isValid = false
      error = 'Чо та неправильно'
    }


    dispatch({type: AUTHLINK_SET, link, isValid, error})

  }
}

export function pushLink(link) {
  return (dispatch, getState) => {

    const state = getState(),
      link = state.auth.link,
      mega = (i) => {
        let start = link.indexOf(i) + i.length + 1
        let stop = link.indexOf('&', start)
        return link.slice(start, stop)
      }



      for (var name in auth) {
        auth[name] = mega(name)
      }


      setData(auth);

      dispatch({type: AUTHLINK_PUSH, auth})

      getUserInfo(dispatch, getState)
    }
  }



  export function setId(id) {
    return ({
      type: APPID_SET,
      payload: id
    })
  }

  export function pushId() {
    return function (dispatch, getState) {
      const
        state = getState(),
        appId = state.auth.id;

      let authlink = `https://oauth.vk.com/authorize?client_id=${appId}&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,photos,audio,video,pages,notes,messages,wall,docs,groups&response_type=token&v=5.68&state=123456`

      dispatch({
        type: APPID_PUSH,
        payload: authlink
      })
    }
  }

  export function logout() {
    return function(dispatch) {
      removeAuth();
      dispatch({
        type: LOGOUT
      });
    }
  }
