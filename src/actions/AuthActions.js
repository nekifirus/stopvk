
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

export function getUserInfo(dispatch, getState) {

  const state = getState()
  const auth = state.auth


  jsonp(`https://api.vk.com/method/users.get?user_ids=${auth.user_id}&fields=photo_100&v=5.68`,

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
    c = ~link.indexOf('expires_in'),
    d = link.length === 172

    console.log(a, b, c, d)
  return (a) && (b) && (c) && (d)
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
