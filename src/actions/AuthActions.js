
import {
  AUTHLINK_SET,
  AUTHLINK_PUSH,
  AUTHLINK_FAIL,
  AUTHLINK_SUCCESS
} from '../constants/Auth'
import jsonp from 'jsonp'


var auth = {
  'user_id': '',
  'access_token': '',
  'expires_in': ''
}

export function autorize() {
  return function(dispatch) {

    async function authrequest() {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http:localhost:8080/" + url);
        xhr.onerror = function() {reject("Network error.")};
        xhr.onload = function() {
            if (xhr.status === 200) {
              console.log(xhr.response)
              resolve(xhr.response)
            }
            else {reject("Loading error:" + xhr.statusText)}
        };
        xhr.send();
      });
    }

  let url = "https://oauth.vk.com/authorize?client_id=6151047&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,photos,audio,video,pages,notes,messages,wall,docs,groups,offline&response_type=token&v=5.68&state=123456"

  authrequest()
    .then(resp => dispatch({type: AUTHLINK_SUCCESS, payload:resp}))
    .catch(err => dispatch({type: AUTHLINK_FAIL, payload: err}))

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

      

      dispatch({type: AUTHLINK_PUSH, auth})

      getUserInfo(dispatch, getState)
    }
  }
