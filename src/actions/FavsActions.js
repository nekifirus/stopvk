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

  FAVPHOTO_SHOWGALERY,
  FAVPHOTO_SHOWMORE,
  FAVPHOTO_SELECTIMAGE,
  FAVPHOTO_SELECTALL,


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
import imagearrPrepare from '../Utils/photoPrepare';




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

        if (offset >= response.count) {

          return dispatch({
              type: success,
              payload: targetarr
          });
        }
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
        photoarr: [],
        linkparams: {
          offset: 0,
          count: 50,
          photo_sizes: 1
        },
        actiontypes: {
          request: FAVPHOTO_REQUEST,
          success: FAVPHOTO_SUCCESS,
          fail: FAVPHOTO_FAIL
        }
      };


    function getFavePhoto(params) {
      return new Promise((resolve, reject) => {
        var {access_token, methodname, linkparams} = params;
        var requestLink = linkCreator(methodname,
                                      access_token,
                                      linkparams);
        jsonpRequest(requestLink)
         .then(function(response){
           params.photoarr = params.photoarr.concat(response.items);
           params.linkparams.offset = params.linkparams.offset + response.items.length;

           if (params.linkparams.offset >= response.count) {
             resolve (params.photoarr);
           } else {
             setTimeout(function() {
                getFavePhoto(params)
              }, 333);
           }
          })
          .catch(function(err){
            reject (err);
          });
      })
    };

  dispatch({type: params.actiontypes.request, payload: params.photoarr.length})
  getFavePhoto(params)
   .then((photoarr) => {
      Promise.resolve(dispatch({
        type: params.actiontypes.success,
        payload: photoarr
      }))
    })
    .then(() => {
      preparePhoto(dispatch, getState);
    })
    .catch((err) => {
      err = JSON.stringify(err);
      return dispatch({
        type: params.actiontypes.fail,
        payload: err
      });
    })

  };
};

export function showFavGalery(){
 return function (dispatch, getState) {
   const state = getState();
   var trigger = state.favs.gallerytrigger;

   preparePhoto(dispatch, getState);
   trigger = !trigger;
   dispatch({
     type: FAVPHOTO_SHOWGALERY,
     payload: trigger
   });


 }
};

export function showMoreFavPhotos(){
  return function(dispatch, getState) {
    preparePhoto(dispatch, getState);

  }
}

function preparePhoto(dispatch, getState) {
  const state = getState();
  var
    origarr = state.favs.photoarrorig,
    photoarr = state.favs.photoarr;
  console.log(origarr, photoarr)



  imagearrPrepare(origarr.splice(0, 20))
    .then((arr) => {
      console.log(arr)
      console.log(photoarr)
      photoarr = photoarr.concat(arr);
      console.log(photoarr);
      return photoarr;
    })
    .then((arr) => {

      dispatch({
        type: FAVPHOTO_SHOWMORE,
        arr: arr,
        orig: origarr
      });
    })
    .catch((err)=> {
      err = JSON.stringify(err);
      return dispatch({
        type: FAVPHOTO_FAIL,
        payload: err
      });
    })
}

export function selectFavPhoto(index, image) {
  return function(dispatch, getState) {
    const state = getState();
    var photoarr = state.favs.photoarr;
    console.log(image)
    image.isSelected = !image.isSelected;
    photoarr.splice(index, 1, image);

    dispatch({
      type: FAVPHOTO_SELECTIMAGE,
      payload: photoarr
    });
  };
};

export function selectAllFavPhotos() {
  return function(dispatch, getState) {
    const state = getState();
    var
      photoarr = state.favs.photoarr,
      photoarrorig = state.favs.photoarrorig;

    photoarr.forEach((item) => item.isSelected = !item.isSelected);
    photoarrorig.forEach((item) => item.isSelected = !item.isSelected);

    dispatch({
      type: FAVPHOTO_SELECTALL,
      arr: photoarr,
      orig: photoarrorig
    })
  }
}


export function favedelPhotos(){
  return function(dispatch, getState) {
    const
      state = getState();
    var
      params = {
        access_token: state.auth.access_token,
        targetarr: [],
        targettype: "photo",

        actiontypes: {
          request: FAVPHOTODEL_REQUEST,
          success: FAVPHOTODEL_SUCCESS,
          fail: FAVPHOTODEL_FAIL
        }
      },
      { photoarr, photoarrorig } = state.favs;

    photoarr = photoarr.concat(photoarrorig);
    console.log("before delete selected", photoarr)
    photoarr.forEach((item) => {
      if(!item.isSelected) params.targetarr.push(item)
    });



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
