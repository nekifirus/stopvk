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

import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator from '../Utils/linkCreator';



export function getVideos(){
  return function(dispatch, getState) {
    const
     state = getState(),
     access_token = state.auth.access_token,
     methodname = "execute.getVideos",
     count = 100;
    var
      offset = 0,
      videosarr = [];

    dispatch({
      type: VIDEOS_REQUEST,
    })

    getVideosRequest(videosarr);

    function getVideosRequest(videosarr){
      var requestLink = linkCreator(methodname, access_token,
                                    {count: count, offset: offset});

      jsonpRequest(requestLink)
        .then((response) => {
          videosarr = videosarr.concat(response.items);
          offset += response.items.length;
          if(offset >= response.count) {
            dispatch({
              type: VIDEOS_SUCCESS,
              payload: videosarr
            });
          } else {
            setTimeout(function(){
              getVideosRequest(videosarr);
            }, 333);
          }
        })
        .catch((err) => {
          err = JSON.stringify(err);
          return dispatch({
            type: VIDEOS_FAIL,
            payload: err
          });
        })
    }
  }
}

export function delVideos(){
  return function(dispatch, getState){
    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "execute.delVideos",
      count = 20;

    var selectedvideos = [];
    state.videos.videosarr.forEach((video) => {
      if(video.isSelected) selectedvideos.push(video.id);
    })

    dispatch({type: VIDEOSDEL_REQUEST});

    delVideosRequest(selectedvideos);

    function delVideosRequest(videosarr) {
      if(!videosarr.length) return dispatch({type: VIDEOSDEL_SUCCESS});
      var videosToDelete = videosarr.splice(-count, count);
      var requestLink = linkCreator(methodname, access_token,
                                    {video_ids: videosToDelete.join()});

      jsonpRequest(requestLink)
        .then((response) => {
          setTimeout(function(){
            delVideosRequest(videosarr);
          }, 333);
        })
        .catch((err) => {
          err = JSON.stringify(err);
          return dispatch({
            type: VIDEOSDEL_FAIL,
            payload: err
          });
        })
    }

  }
}

export function selectVideo(video, index){
  return function(dispatch, getState){
    const state = getState();
    var videosarr = state.videos.videosarr;

    video.isSelected = !video.isSelected;
    videosarr.splice(index, 1, video);

    dispatch({
      type: VIDEOS_SELECT,
      payload: videosarr
    })
  }
}

export function selectAllVideos(){
  return function(dispatch, getState){
    const state = getState();
    var videosarr = state.videos.videosarr;

    videosarr.forEach((video, index) => {
      videosarr[index].isSelected = true;
    })

    dispatch({
      type: VIDEOS_SELECTALL,
      payload: videosarr
    });
  }
}

export function showVideo(video) {
  return {type: VIDEO_SHOW, payload: video }
}

export function closeVideo() {
  return {type: VIDEO_CLOSE}
}
