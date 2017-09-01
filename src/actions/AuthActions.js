import {AUTHLINK_SET, AUTHLINK_PUSH} from '../constants/Auth'

var auth = {
  'user_id': '',
  'access_token': '',
  'expires_in': ''
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

    }
  }
