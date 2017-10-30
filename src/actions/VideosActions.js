import {
  VIDEOS_REQUEST,
  VIDEOS_SUCCESS,
  VIDEOS_FAIL,

  VIDEOS_SELECT,
  VIDEOS_SELECTALL,

  VIDEOSDEL_REQUEST,
  VIDEOSDEL_SUCCESS,
  VIDEOSDEL_FAIL,

  VIDEO_SHOW,
  VIDEO_CLOSE

} from '../constants/Videos';

import {apiDelVideo} from '../Utils/APImethods';

import {getwithOffset, deleteWithExecute} from '../Utils/Requester';



export function getVideos(){
  return function(dispatch, getState) {

    function requestVideo(percent) {
      return dispatch({type: VIDEOS_REQUEST, payload: percent})
    }

    function successVideo(arr) {
      return {type: VIDEOS_SUCCESS, payload: arr}
    }

    function failVideo(e) {
      return {type: VIDEOS_FAIL, payload: JSON.stringify(e)}
    }

    const
     state = getState();

    var params = {
      access_token: state.auth.access_token,
      methodname: "video.get",
      targetarr: [],
      requestparams: {
        count: 200,
        offset: 0
      }
    }

   requestVideo(0);

   getwithOffset(params, requestVideo)
    .then(videosarr => {
      dispatch(successVideo(videosarr))
    })
    .catch(e => dispatch(failVideo(e)))
  }
}

export function delVideos(){
  return function(dispatch, getState){

    function delreqiestVideo() {
      return {type: VIDEOSDEL_REQUEST};
    };

    function delsuccessVideo(videosarr, videoslength) {
      return {type: VIDEOSDEL_SUCCESS, payload: videosarr, videoslength: videoslength};
    };

    function delfailVideo(e) {
      return {type: VIDEOSDEL_FAIL, payload: (JSON.stringify(e))};
    };

    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      videosarr = state.videos.videosarr,
      videostodellarr = [], videostosave = [];

    videosarr.forEach((video) => {
      if (video.isSelected) {videostodellarr.push(video)} else {videostosave.push(video)}
    });


    dispatch(delreqiestVideo());

    deleteWithExecute(videostodellarr, access_token, apiDelVideo)
      .then(deleted => {
        dispatch(delsuccessVideo(videostosave, 0));
      })
      .catch(err => {
        err.deleted.forEach(video => {
          let idx = videosarr.indexOf(video);
          videosarr.splice(idx, 1)
        })
        console.log(err.deleted);
        dispatch(delsuccessVideo(videosarr, (videosarr.length - Number(err.deleted))));
        dispatch(delfailVideo(err.error))
      })

    }
}








export function selectVideo(video, index){
  return function(dispatch, getState){
    const state = getState();
    var
      videosarr = state.videos.videosarr,
      videoslength = state.videos.videoslength,
      access_token = state.auth.access_token;

    video.isSelected = !video.isSelected;
    videosarr.splice(index, 1, video);

    if (video.isSelected) {
      videoslength += 1;
    } else {
      videoslength -= 1;
    }

    var mystorage = localStorage;

    mystorage.setItem("access_token", access_token)

    dispatch({
      type: VIDEOS_SELECT,
      payload: videosarr,
      videoslength: videoslength
    })
  }
}

export function selectAllVideos(){
  return function(dispatch, getState){
    const state = getState();
    var videosarr = state.videos.videosarr;

    videosarr.forEach(video => {
      video.isSelected = true;
    })

    dispatch({
      type: VIDEOS_SELECTALL,
      payload: videosarr,
      videoslength: videosarr.length
    });
  }
}

export function dropVideoSelection(){
  return function(dispatch, getState){
    const state = getState();
    var
      videosarr = state.videos.videosarr;

    videosarr.forEach(video => {
      video.isSelected = false;
    })

    dispatch({
      type: VIDEOS_SELECTALL,
      payload: videosarr,
      videoslength: 0
    });
  }
}

export function showVideo(video) {
  return {type: VIDEO_SHOW, payload: video }
}

export function closeVideo() {
  return {type: VIDEO_CLOSE}
}
