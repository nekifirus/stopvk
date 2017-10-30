
import {
  //запрос информации
  WALLINDEX_SUCCESS,
  WALLINDEX_FAIL,
  WALLINDEX_REQUEST,
  //удаление постов
  WALLDELL_START,
  WALLDELL_STOP,
  WALLDELL_WORK,
  WALLDELL_ERROR,
  WALLDELL_SUCCESS
} from '../constants/Wall';

import {getwithOffset} from '../Utils/Requester';
import {executeLinkCreator} from '../Utils/linkCreator';
import delay from '../Utils/Delay';
import jsonpRequest from '../Utils/jsonpRequest';
import {apiDelPosts} from '../Utils/APImethods';

export function stopWallDelete() {
  return { type: WALLDELL_STOP };
};




export function deletePosts() {
  return function(dispatch, getState) {

    function progress(percent) {
      dispatch({
        type: WALLDELL_WORK,
        payload: percent
      })
    }

    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      posts = state.wall.posts,
      savedposts = [...posts];

    dispatch({type: WALLDELL_START})

    deleteWallPosts(posts, access_token, progress, getState)
      .then(() => {
        dispatch({
          type: WALLDELL_SUCCESS,
          payload: []
        });
        (requestWallPosts())(dispatch, getState);
      })
      .catch((err) => {
        err.deleted.forEach(post => {
          let idx = savedposts.indexOf(post);
          savedposts.splice(idx, 1)
        })
        dispatch({type: WALLDELL_SUCCESS, payload: savedposts});
        dispatch({type: WALLDELL_ERROR, payload: err.error});
      })
  }
}

async function deleteWallPosts(items, access_token, onUpdate, getState) {
  const count = 10, initiallength = items.length;
  var deleted = [];

  while(items.length) {

    let state = getState();
    if(!state.wall.trigger) {
      let err = {
        deleted: deleted,
        error: new Error("Stopped")
      };
      throw err;
    }

    let todel = items.splice(-count);

    let url = executeLinkCreator(
      todel.map(item => apiDelPosts(item.id)),
      access_token
    );
    try {
      await delay(333).then(()=>jsonpRequest(url));
    } catch (e) {
      let err = {
        deleted: deleted,
        error: e
      };
      console.log(err)
      throw err;
    }
    deleted = deleted.concat(todel);
    if (typeof onUpdate === "function") {
      onUpdate(Math.floor(100 - items.length/initiallength*100));
    }
  }

  return deleted;
}





export function requestWallPosts(){
  return function(dispatch, getState) {

    function progress(percent) {
      dispatch({
        type: WALLINDEX_REQUEST,
        payload: percent
      })
    }

    const
     state = getState();

    var params = {
      access_token: state.auth.access_token,
      methodname: "wall.get",
      targetarr: [],
      requestparams: {
        count: 100,
        offset: 0
      }
    }

    getwithOffset(params, progress)
      .then(posts => {
        dispatch({
          type: WALLINDEX_SUCCESS,
          payload: posts
        })
      })
      .catch(e => {
        dispatch({
          type: WALLINDEX_FAIL,
          payload: e.toString()
        })
      })

  }
}
