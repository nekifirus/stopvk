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



} from '../constants/Favs';

import {
  CAPTCHA_NEEDED
} from '../constants/Captcha';


import {getwithOffset, deleteWithExecute} from '../Utils/Requester';
import {
  apiFaveDelLink,
  apiFaveDelUser,
  apiUnLike
} from '../Utils/APImethods';


export function initFavs() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

      initSeq(access_token, dispatch)
  }
}


async function initSeq(access_token, dispatch) {

  await favegetLinks(access_token, dispatch);
  await favegetUsers(access_token, dispatch);
  await favegetVideos(access_token, dispatch);
  await favegetPosts(access_token, dispatch);
  await favegetMarkit(access_token, dispatch);
}


async function favegetLinks(access_token, dispatch) {

  function onUpdate(percent) {
    dispatch({
      type: FAVLINKS_REQUEST,
      payload: percent
    })
  }

  function onSuccess(linkarr) {
    dispatch({
      type: FAVLINKS_SUCCESS,
      payload: linkarr
    })
  }

  function onError(e) {
    dispatch({
      type: FAVLINKS_FAIL,
      payload: e
    })
  }

  var params = {
    access_token: access_token,
    methodname: "fave.getLinks",
    targetarr: [],
    requestparams: {
      count: 50,
      offset: 0
    }
  };

  getwithOffset(params, onUpdate)
    .then(onSuccess)
    .catch(onError)

}



async function favegetUsers(access_token, dispatch) {

  function onUpdate(percent) {
    dispatch({
      type: FAVUSER_REQUEST,
      payload: percent
    })
  }

  function onSuccess(linkarr) {
    dispatch({
      type: FAVUSER_SUCCESS,
      payload: linkarr
    })
  }

  function onError(e) {
    dispatch({
      type: FAVUSER_FAIL,
      payload: e
    })
  }

  var params = {
    access_token: access_token,
    methodname: "fave.getUsers",
    targetarr: [],
    requestparams: {
      count: 50,
      offset: 0
    }
  };

  getwithOffset(params, onUpdate)
    .then(onSuccess)
    .catch(onError)

}

async function favegetVideos(access_token, dispatch) {

  function onUpdate(percent) {
    dispatch({
      type: FAVVIDEO_REQUEST,
      payload: percent
    })
  }

  function onSuccess(linkarr) {
    dispatch({
      type: FAVVIDEO_SUCCESS,
      payload: linkarr
    })
  }

  function onError(e) {
    dispatch({
      type: FAVVIDEO_FAIL,
      payload: e
    })
  }

  var params = {
    access_token: access_token,
    methodname: "fave.getVideos",
    targetarr: [],
    requestparams: {
      count: 50,
      offset: 0
    }
  };

  getwithOffset(params, onUpdate)
    .then(onSuccess)
    .catch(onError)

}


async function favegetPosts(access_token, dispatch) {

  function onUpdate(percent) {
    dispatch({
      type: FAVPOSTS_REQUEST,
      payload: percent
    })
  }

  function onSuccess(linkarr) {
    dispatch({
      type: FAVPOSTS_SUCCESS,
      payload: linkarr
    })
  }

  function onError(e) {
    dispatch({
      type: FAVPOSTS_FAIL,
      payload: e
    })
  }

  var params = {
    access_token: access_token,
    methodname: "fave.getPosts",
    targetarr: [],
    requestparams: {
      count: 100,
      offset: 0
    }
  };

  getwithOffset(params, onUpdate)
    .then(onSuccess)
    .catch(onError)

}


async function favegetMarkit(access_token, dispatch) {

  function onUpdate(percent) {
    dispatch({
      type: FAVMARKIT_REQUEST,
      payload: percent
    })
  }

  function onSuccess(linkarr) {
    dispatch({
      type: FAVMARKIT_SUCCESS,
      payload: linkarr
    })
  }

  function onError(e) {
    dispatch({
      type: FAVMARKIT_FAIL,
      payload: e
    })
  }

  var params = {
    access_token: access_token,
    methodname: "fave.getMarketItems",
    targetarr: [],
    requestparams: {
      count: 50,
      offset: 0
    }
  };


  getwithOffset(params, onUpdate)
    .then(onSuccess)
    .catch(onError)

}




function captchaneeded (img, sid, func) {

  return {
    type: CAPTCHA_NEEDED,
    img: img,
    sid: sid,
    func: func
  }
}







export function favedelLinks() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    var linkarr = state.favs.linkarr;

    function onSuccess(deleted) {
      deleted.forEach(link => {
        let idx = linkarr.indexOf(link);
        linkarr.splice(idx, 1)
      });

      dispatch({
        type: FAVLINKSDEL_SUCCESS,
        payload: linkarr
      });
    };

    function onError(err) {
      onSuccess(err.deleted);
      if (err.error.error_code === 14) {
        let img = err.error.captcha_img;
        let sid = err.error.captcha_sid;
        dispatch(captchaneeded(img, sid, favedelLinks))
      }
      dispatch({
        type: FAVLINKSDEL_FAIL,
        payload: err.e
      });
    }

    function onUpdate(percent) {
      dispatch({
        type: FAVLINKSDEL_REQUEST,
        percent: percent
      });
    };

    deleteWithExecute(linkarr, access_token, apiFaveDelLink, onUpdate)
      .then(onSuccess)
      .catch(onError)
  }
};





export function favedelUsers() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    var userarr = state.favs.userarr;

    function onSuccess(deleted) {
      deleted.forEach(link => {
        let idx = userarr.indexOf(link);
        userarr.splice(idx, 1)
      });

      dispatch({
        type: FAVUSERDEL_SUCCESS,
        payload: userarr
      });
    };

    function onError(err) {
      onSuccess(err.deleted);
      if (err.error.error_code === 14) {
        let img = err.error.captcha_img;
        let sid = err.error.captcha_sid;
        dispatch(captchaneeded(img, sid, favedelUsers))
      }
      dispatch({
        type: FAVUSERDEL_FAIL,
        payload: err.e
      });
    }

    function onUpdate(percent) {
      dispatch({
        type: FAVUSERDEL_REQUEST,
        percent: percent
      });
    };

    deleteWithExecute(userarr, access_token, apiFaveDelUser, onUpdate)
      .then(onSuccess)
      .catch(onError)
  }
}










export function favedelVideos() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    var videoarr = state.favs.videoarr;

    function onSuccess(deleted) {
      deleted.forEach(link => {
        let idx = videoarr.indexOf(link);
        videoarr.splice(idx, 1)
      });

      dispatch({
        type: FAVVIDEODEL_SUCCESS,
        payload: videoarr
      });
    };

    function onError(err) {
      onSuccess(err.deleted);
      if (err.error.error_code === 14) {
        let img = err.error.captcha_img;
        let sid = err.error.captcha_sid;
        dispatch(captchaneeded(img, sid, favedelVideos))
      }
      dispatch({
        type: FAVVIDEODEL_FAIL,
        payload: err.e
      });
    }

    function onUpdate(percent) {
      dispatch({
        type: FAVVIDEODEL_REQUEST,
        percent: percent
      });
    };

    function unLikeVideo(video) {
      return apiUnLike("video", video.owner_id, video.id)
    }

    deleteWithExecute(videoarr, access_token, unLikeVideo, onUpdate)
      .then(onSuccess)
      .catch(onError)
  }
}





export function favedelPosts() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    var postsarr = state.favs.postsarr;

    function onSuccess(deleted) {
      deleted.forEach(link => {
        let idx = postsarr.indexOf(link);
        postsarr.splice(idx, 1)
      });

      dispatch({
        type: FAVPOSTSDEL_SUCCESS,
        payload: postsarr
      });
    };

    function onError(err) {
      onSuccess(err.deleted);
      if (err.error.error_code === 14) {
        let img = err.error.captcha_img;
        let sid = err.error.captcha_sid;
        dispatch(captchaneeded(img, sid, favedelPosts))
      }
      dispatch({
        type: FAVPOSTSDEL_FAIL,
        payload: err.e
      });
    }

    function onUpdate(percent) {
      dispatch({
        type: FAVPOSTSDEL_REQUEST,
        percent: percent
      });
    };

    function unLikePost(post) {
      return apiUnLike("post", post.owner_id, post.id)
    }

    deleteWithExecute(postsarr, access_token, unLikePost, onUpdate)
      .then(onSuccess)
      .catch(onError)
  }
}










export function favedelMarkit() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    var markitarr = state.favs.markitarr;

    function onSuccess(deleted) {
      deleted.forEach(link => {
        let idx = markitarr.indexOf(link);
        markitarr.splice(idx, 1)
      });

      dispatch({
        type: FAVMARKITDEL_SUCCESS,
        payload: markitarr
      });
    };

    function onError(err) {
      onSuccess(err.deleted);
      if (err.error.error_code === 14) {
        let img = err.error.captcha_img;
        let sid = err.error.captcha_sid;
        dispatch(captchaneeded(img, sid, favedelMarkit))
      }
      dispatch({
        type: FAVMARKITDEL_FAIL,
        payload: err.e
      });
    }

    function onUpdate(percent) {
      dispatch({
        type: FAVMARKITDEL_REQUEST,
        percent: percent
      });
    };

    function unLikeMarkit(markit) {
      return apiUnLike("markiet_item", markit.owner_id, markit.id)
    }

    deleteWithExecute(markitarr, access_token, unLikeMarkit, onUpdate)
      .then(onSuccess)
      .catch(onError)
  };
};
