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
  FAVUSERDEL_FAIL,
  //fav video
  FAVVIDEO_REQUEST,
  FAVVIDEO_SUCCESS,
  FAVVIDEO_FAIL,

  FAVVIDEODEL_REQUEST,
  FAVVIDEODEL_SUCCESS,
  FAVVIDEODEL_FAIL,

  //fav posts
  FAVPOSTS_REQUEST,
  FAVPOSTS_SUCCESS,
  FAVPOSTS_FAIL,

  FAVPOSTSDEL_REQUEST,
  FAVPOSTSDEL_SUCCESS,
  FAVPOSTSDEL_FAIL,

  CAPTCHA_NEEDED,
  CAPTCHA_SET,
  CAPTCHA_SUBMITED

} from '../constants/Favs';
import jsonp from 'jsonp';
import linkCreator from '../Utils/linkCreator';
import arrPrepare from '../Utils/arrPrepare';


function jsonpRequest(requestLink) {
  return new Promise(function(resolve, reject) {
    jsonp(requestLink, function(err, data) {
      if (err) reject (err);
      if (data) resolve (data);
    })
  });
};

function likesPrepare(arr, count) {
 var returnstring = [];
 arr = arr.splice(-count, count);

 for (var key of arr) {
     returnstring.push(key.id);
     returnstring.push(key.owner_id);
  };

 returnstring = returnstring.join();
 return returnstring;
};


export function setCaptcha(captcha_key) {
  return { type: CAPTCHA_SET, payload: captcha_key };
};

export function submitCaptcha() {
  return function(dispatch, getState) {
    const state = getState();
    var params = state.favs.captcha_params;

    params.captcha_sid = state.favs.captcha_sid;
    params.captcha_key = state.favs.captcha_key;



    console.log(params)

    dispatch({
      type: CAPTCHA_SUBMITED
    });

    unLike(params, dispatch);

  }
}

export function favegetLinks() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "fave.getLinks",
      count = 50,
      types = {
        request: FAVLINKS_REQUEST,
        success: FAVLINKS_SUCCESS,
        fail: FAVLINKS_FAIL
      };

    getFave(methodname, count, access_token, types, dispatch);
  }
}

export function favedelLinks() {
  return function(dispatch, getState) {
    const
      state = getState(),
      params = {
        access_token: state.auth.access_token,
        targetarr: state.favs.linkarr,

        methodname: "execute.favlinks_del",
        actiontypes: {
          request: FAVLINKSDEL_REQUEST,
          success: FAVLINKSDEL_SUCCESS,
          fail: FAVLINKSDEL_FAIL
        }
      };
    delFave(params, dispatch)
  }
}




export function favegetUsers() {
  return function(dispatch, getState){
    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "fave.getUsers",
      count = 50,
      types = {
        request: FAVUSER_REQUEST,
        success: FAVUSER_SUCCESS,
        fail: FAVUSER_FAIL
      };

    getFave(methodname, count, access_token, types, dispatch);
  }
}

export function favedelUsers() {
  return function(dispatch, getState) {
    const
      state = getState(),
      params = {
        access_token: state.auth.access_token,
        targetarr: state.favs.userarr,

        methodname: "execute.favusers_del",
        actiontypes: {
          request: FAVUSERDEL_REQUEST,
          success: FAVUSERDEL_SUCCESS,
          fail: FAVUSERDEL_FAIL
        }
      }

    delFave(params, dispatch);
  }
}






export function favegetVideos() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "fave.getVideos",
      count = 50,
      types = {
        request: FAVVIDEO_REQUEST,
        success: FAVVIDEO_SUCCESS,
        fail: FAVVIDEO_FAIL
      };

    getFave(methodname, count, access_token, types, dispatch);
  }
}

export function favedelVideos() {
  return function(dispatch, getState) {
    const
      state = getState(),
      params = {
        access_token: state.auth.access_token,
        targetarr: state.favs.videoarr,
        targettype: "video",

        actiontypes: {
          request: FAVVIDEODEL_REQUEST,
          success: FAVVIDEODEL_SUCCESS,
          fail: FAVVIDEODEL_FAIL
        }
      };

    unLike(params, dispatch);
  }
}



export function favegetPosts() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "execute.faveposts_get",
      count = 30,
      types = {
        request: FAVPOSTS_REQUEST,
        success: FAVPOSTS_SUCCESS,
        fail: FAVPOSTS_FAIL
      };

    getPosts(methodname, count, access_token, types, dispatch);

    function getPosts(methodname, count, access_token, types, dispatch) {
      const
        { request, success, fail } = types;

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
                  console.log(data)

                  targetarr = targetarr.concat(data.response.items);
                  offset = data.response.offset;
                  console.log(data.response.count, offset, targetarr)
                  //странно работает. отдает не все. разобраться
                  if (!data.response.items.length) return dispatch({
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


  }
}


export function favedelPosts() {
  return function(dispatch, getState) {
    const
      state = getState(),
      params = {
        access_token: state.auth.access_token,
        targetarr: state.favs.postsarr,
        targettype: "post",
        actiontypes: {
          request: FAVPOSTSDEL_REQUEST,
          success: FAVPOSTSDEL_SUCCESS,
          fail: FAVPOSTSDEL_FAIL
        }
      };

    unLike(params, dispatch);
  }
}



function unLike(params, dispatch) {

  const
    { access_token, targetarr, targettype, actiontypes } = params,
    { request, success, fail } = actiontypes,
    count = 15;

  if (!targetarr.length) return dispatch({ type: success });

  dispatch({
    type: request,
    payload: targetarr.length
  });

  var
    likestoDelete = likesPrepare(targetarr, count),
    requestLink = linkCreator("execute.unlike", access_token,
                { items: likestoDelete, type: targettype });

  if (params.captcha_key) {
    requestLink = requestLink + "&captcha_sid=" + params.captcha_sid + "&captcha_key=" + params.captcha_key;
    console.log(requestLink)
    delete params.captcha_key;
    delete params.captcha_sid;
  }

  jsonpRequest(requestLink)
    .then(function(data) {
      console.log(data)
      if (data.response) return data.response;
      if (data.error) throw data.error;
    })
    .then(function(response){
      targetarr.splice(-count, count);
      params.targetarr = targetarr;
      setTimeout(function() {
       unLike(params, dispatch);
      }, 333);
    })
    .catch(function(err){
      if (err.error_code === 14) {
        return dispatch({
          type: CAPTCHA_NEEDED,
          img: err.captcha_img,
          sid: err.captcha_sid,
          params: params
        });
      }
      return dispatch({
        type: fail,
        payload: err.toString
      });
    });
};






function getFave(methodname, count, access_token, types, dispatch) {
  const
    { request, success, fail } = types;

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
              console.log(data)

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
