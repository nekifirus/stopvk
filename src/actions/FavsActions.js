import {
  //закладки ссылки
  FAVLINKS_REQUEST,
  FAVLINKS_SUCCESS,
  FAVLINKS_FAIL,
  FAVLINKSDEL_REQUEST,
  FAVLINKSDEL_SUCCESS,
  FAVLINKSDEL_FAIL,
  //закладки пользователи
  FAVUSER_REQUEST,
  FAVUSER_SUCCESS,
  FAVUSER_FAIL,
  FAVUSERDEL_REQUEST,
  FAVUSERDEL_SUCCESS,
  FAVUSERDEL_FAIL

} from '../constants/Favs';
import jsonp from 'jsonp';
import linkCreator from '../Utils/linkCreator';
import arrPrepare from '../Utils/arrPrepare';


export function favegetLinks() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "fave.getLinks",
      types = {
        request: FAVLINKS_REQUEST,
        success: FAVLINKS_SUCCESS,
        fail: FAVLINKS_FAIL
      };

    getFave(methodname, access_token, types, dispatch);
  }
}

export function favedelLinks() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token,
      targetarr = state.favs.linkarr,

      methodname = "execute.favlinks_del",
      types = {
        request: FAVLINKSDEL_REQUEST,
        success: FAVLINKSDEL_SUCCESS,
        fail: FAVLINKSDEL_FAIL
      };
    delFave(methodname, access_token, targetarr, types, dispatch)
  }
}

export function favegetUsers() {
  return function(dispatch, getState){
    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "fave.getUsers",
      types = {
        request: FAVUSER_REQUEST,
        success: FAVUSER_SUCCESS,
        fail: FAVUSER_FAIL
      };

    getFave(methodname, access_token, types, dispatch);
  }
}

export function favedelUsers() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token,
      targetarr = state.favs.userarr,

      methodname = "execute.favusers_del",
      types = {
        request: FAVUSERDEL_REQUEST,
        success: FAVUSERDEL_SUCCESS,
        fail: FAVUSERDEL_FAIL
      };
    delFave(methodname, access_token, targetarr, types, dispatch);
  }
}




function getFave(methodname, access_token, types, dispatch) {
  const
    { request, success, fail } = types,
    count = 50;

  var
    offset = 0,
    targetarr = [];

  dispatch({
    type: request,
    payload: targetarr.length
  })

  faveRequestCycle(offset);

  function faveRequestCycle(offset) {
    jsonp(linkCreator(methodname,
                      access_token,
                      { count: count, offset: offset }),
          function(err, data) {
            if (err) {
              dispatch({
                type: fail,
                payload: err
              });
            };
            if (data) {
              targetarr = targetarr.concat(data.response.items);
              offset = offset + count;
              if (offset > data.response.count) return dispatch({
                  type: success,
                  payload: targetarr
                });
              dispatch({
                type: request,
                payload: targetarr.length
              });
              setTimeout(function() {
                faveRequestCycle(offset)
              }, 333);
            }
          })
  }

}



function delFave(methodname, access_token, targetarr, types, dispatch) {
  const
    { request, success, fail } = types,
    count = 20;
  dispatch({
    type: request,
    payload: targetarr.length
  })

  delRequest()

  function delRequest() {
    if (!targetarr.length) return dispatch({ type: success });

    var favstoDelete = arrPrepare(targetarr, count);

    jsonp(
      linkCreator(methodname, access_token,
                  { count: count, favs: favstoDelete }),
      function(err, data) {
        if (err) return dispatch({
          type: fail,
          payload: err
        });
        if (data) {

          dispatch({
            type: request,
            payload: targetarr.length
          });
          setTimeout(function() {
           delRequest();
          }, 333);
        }
      }
    );
  }

}
