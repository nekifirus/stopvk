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

  //marketitems
  FAVMARKIT_REQUEST,
  FAVMARKIT_SUCCESS,
  FAVMARKIT_FAIL,

  FAVMARKITDEL_REQUEST,
  FAVMARKITDEL_SUCCESS,
  FAVMARKITDEL_FAIL,

  //fav photo
  FAVPHOTO_REQUEST,
  FAVPHOTO_SUCCESS,
  FAVPHOTO_FAIL,

  FAVPHOTODEL_REQUEST,
  FAVPHOTODEL_SUCCESS,
  FAVPHOTODEL_FAIL,

  //captcha
  CAPTCHA_NEEDED,
  CAPTCHA_SET,
  CAPTCHA_CANCEL,
  CAPTCHA_SUBMITED

} from '../constants/Favs';

import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator from '../Utils/linkCreator';
import arrPrepare from '../Utils/arrPrepare';
import likesPrepare from '../Utils/likesPrepare';





export function favegetLinks() {
  return function(dispatch, getState) {
    const
      state = getState(),
      params = {
        access_token: state.auth.access_token,
        methodname: "fave.getLinks",
        count: 50,
        actiontypes: {
          request: FAVLINKS_REQUEST,
          success: FAVLINKS_SUCCESS,
          fail: FAVLINKS_FAIL
        }
      };


    getFave(params, dispatch);
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
      params = {
        access_token: state.auth.access_token,
        methodname: "fave.getUsers",
        count: 50,
        actiontypes: {
          request: FAVUSER_REQUEST,
          success: FAVUSER_SUCCESS,
          fail: FAVUSER_FAIL
        }
      };

    getFave(params, dispatch);
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
      params = {
        access_token: state.auth.access_token,
        methodname: "fave.getVideos",
        count: 50,
        actiontypes: {
          request: FAVVIDEO_REQUEST,
          success: FAVVIDEO_SUCCESS,
          fail: FAVVIDEO_FAIL
        }
      };

    getFave(params, dispatch);
  };
};

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
      params = {
        access_token: state.auth.access_token,
        methodname: "execute.faveposts_get",
        count: 30,
        actiontypes: {
          request: FAVPOSTS_REQUEST,
          success: FAVPOSTS_SUCCESS,
          fail: FAVPOSTS_FAIL
        }
      }


    getPosts(params, dispatch);

    function getPosts(params, dispatch) {
      const
        { access_token, methodname, count, actiontypes } = params,
        { request, success, fail } = actiontypes;

      var
        offset = 0,
        targetarr = [];

      dispatch({
        type: request,
        payload: targetarr.length
      })

      faveRequestCycle(offset);

      function faveRequestCycle(offset) {

        jsonpRequest(linkCreator(methodname,
                          access_token,
                          { count: count, offset: offset }))
          .then(function(response) {
            targetarr = targetarr.concat(response.items);
            offset = response.offset;
            console.log(response.count, offset, targetarr)
            //странно работает. отдает не все. разобраться
            if (!response.items.length) return dispatch({
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
          })
          .catch(function(err){
            err = JSON.stringify(err);
            return dispatch({
              type: fail,
              payload: err
            });
          });
      };
    };
  };
};


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
    .then(function(response){
      console.log(response)
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
      };
      err = JSON.stringify(err);
      return dispatch({
        type: fail,
        payload: err
      });
    });
};






function getFave(params, dispatch) {
  const
    { methodname, count, access_token, actiontypes } = params,
    { request, success, fail } = actiontypes;

  var
    offset = 0,
    targetarr = [];

  faveRequestCycle(offset);

  function faveRequestCycle(offset) {

    dispatch({
      type: request,
      payload: targetarr.length
    });

    var requestLink = linkCreator(methodname, access_token,
                                  { count: count, offset: offset });
    jsonpRequest(requestLink)
      .then(function(response){
        console.log(response)
        targetarr = targetarr.concat(response.items);
        offset = offset + response.items.length;
        if (offset >= response.count) return dispatch({
            type: success,
            payload: targetarr
          });
        setTimeout(function() {
          faveRequestCycle(offset)
        }, 333);
      })
      .catch(function(err){
        err = JSON.stringify(err);
        return dispatch({
          type: fail,
          payload: err
        });
      });
  };
};



function delFave(params, dispatch) {
  const
    { methodname, access_token, targetarr, actiontypes } = params,
    { request, success, fail } = actiontypes,
    count = 20;

  if (!targetarr.length) return dispatch({ type: success });

  dispatch({
    type: request,
    payload: targetarr.length
  });

  var favstoDelete = arrPrepare(targetarr, count),
      requestLink = linkCreator(methodname, access_token,
                                { count: count, favs: favstoDelete });

  jsonpRequest(requestLink)
    .then(function(response){
      dispatch({
        type: request,
        payload: targetarr.length
      });
      targetarr.splice(-count, count);
      params.targetarr = targetarr;
      setTimeout(function() {
       delFave(params, dispatch);
      }, 333);
    })
    .catch(function(err){
      err = JSON.stringify(err);
      return dispatch({
        type: fail,
        payload: err
      });
    });
};




export function favegetMarkit(){
  return function(dispatch, getState){
    const
      state = getState(),
      params = {
        access_token: state.auth.access_token,
        methodname: "fave.getMarketItems",
        count: 50,
        actiontypes: {
          request: FAVMARKIT_REQUEST,
          success: FAVMARKIT_SUCCESS,
          fail: FAVMARKIT_FAIL
        }
      };

    getFave(params, dispatch);
  };
};

export function favedelMarkit() {
  return function(dispatch, getState) {
    const
      state = getState(),
      params = {
        access_token: state.auth.access_token,
        targetarr: state.favs.markitarr,
        targettype: "market",

        actiontypes: {
          request: FAVMARKITDEL_REQUEST,
          success: FAVMARKITDEL_SUCCESS,
          fail: FAVMARKITDEL_FAIL
        }
      };

    unLike(params, dispatch);
  };
};



//////////////////PHOTO////////////////////

export function favegetPhotos(){
  return function(dispatch, getState){
    const
      state = getState(),
      params = {
        access_token: state.auth.access_token,
        methodname: "execute.favephotos_get",
        targetarr: [],
        linkparams: {
          count: 50,
          offset: 0,
          photo_sizes: 1
        },
        actiontypes: {
          request: FAVPHOTO_REQUEST,
          success: FAVPHOTO_SUCCESS,
          fail: FAVPHOTO_FAIL
        }
      };

    getPhotos(params, dispatch);
    console.log(params.targetarr.splice(-10))

    function getPhotos(params, dispatch) {
      var
        { methodname, access_token, linkparams } = params,
        requestLink = linkCreator(methodname, access_token, linkparams);
      const { request, success, fail } = params.actiontypes;

      dispatch({type: request, payload: params.targetarr.length});

      jsonpRequest(requestLink)
        .then(function(response){
          console.log(response)
          params.targetarr = params.targetarr.concat(response.items);
          params.linkparams.offset += response.items.length;
          console.log(params)
          if (params.linkparams.offset >= response.count) throw params.targetarr.splice(-10)
          if (params.linkparams.offset >= response.count) return dispatch({
              type: success,
              payload: params.targetarr
            });
          setTimeout(function() {
            getPhotos(params, dispatch)
          }, 333);
        })
        .catch(function(err){
          err = JSON.stringify(err);
          return dispatch({
            type: fail,
            payload: err
          });
        });
    }
  };
};


export function favedelPhotos(){
  return function(dispatch, getState) {
    const
      state = getState(),
      params = {
        access_token: state.auth.access_token,
        targetarr: state.favs.photoarr,
        targettype: "photo",

        actiontypes: {
          request: FAVPHOTODEL_REQUEST,
          success: FAVPHOTODEL_SUCCESS,
          fail: FAVPHOTODEL_FAIL
        }
      };

    unLike(params, dispatch);
  };
}

/////////////////CAPTCHA/////////////////

export function setCaptcha(captcha_key) {
  return { type: CAPTCHA_SET, payload: captcha_key };
};

export function cancelCaptcha(){
  return { type: CAPTCHA_CANCEL };
};

export function submitCaptcha() {
  return function(dispatch, getState) {
    const state = getState();
    var params = state.favs.captcha_params;

    params.captcha_sid = state.favs.captcha_sid;
    params.captcha_key = state.favs.captcha_key;

    dispatch({
      type: CAPTCHA_SUBMITED
    });

    unLike(params, dispatch);

  };
};
