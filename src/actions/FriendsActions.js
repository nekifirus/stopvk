import {
  FRIENDS_REQUEST,
  FRIENDS_SUCCESS,
  FRIENDS_FAIL,

  FRIENDS_SELECT,
  FRIENDS_SELECTALL,

  FRIENDSDEL_REQUEST,
  FRIENDSDEL_SUCCESS,
  FRIENDSDEL_FAIL,

} from '../constants/Friends';

import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator from '../Utils/linkCreator';
import {apiUnFriend} from '../Utils/APImethods';
import {deleteWithExecute} from '../Utils/Requester';




export function getFriends() {
  return function(dispatch, getState) {

    function friendsRequest() {
      return {type: FRIENDS_REQUEST}
    }

    function friendsSuccess(friendsarr) {
      return {type: FRIENDS_SUCCESS, payload: friendsarr}
    }

    function friendsFail(e) {
      return {type: FRIENDS_FAIL, payload: e}
    }

    const
      state = getState(),
      access_token = state.auth.access_token;

    let url = linkCreator("friends.get", access_token, {
      count: 5000,
      offset: 0,
      fields: "domain,photo_max,common_count",
      order: "hints"
    })

    dispatch(friendsRequest());

    jsonpRequest(url)
      .then(response => dispatch(friendsSuccess(response.items)))
      .catch(err => dispatch(friendsFail(JSON.stringify(err))))

  }
}






export function unFriend() {
  return function(dispatch, getState) {

    function unFriendStart() {
      return {type: FRIENDSDEL_REQUEST}
    }

    function unFriendStop(friendsarr) {
      return {type: FRIENDSDEL_SUCCESS, payload: friendsarr}
    }

    function unFriendFail(e) {
      return {type: FRIENDSDEL_FAIL, payload: JSON.stringify(e)}
    }

    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      friendsarr = state.friends.friendsarr,
      friendstodellarr = [];

    friendsarr.forEach((friend) => {
      if (friend.isSelected) friendstodellarr.push(friend);
    });


    dispatch(unFriendStart());

    deleteWithExecute(friendstodellarr, access_token, apiUnFriend)
      .then(deleted => {
        deleted.forEach(friend => {
          let idx = friendsarr.indexOf(friend);
          friendsarr.splice(idx, 1)
        })
        dispatch(unFriendStop(friendsarr));
      })
      .catch(err => {
        err.deleted.forEach(friend => {
          let idx = friendsarr.indexOf(friend);
          friendsarr.splice(idx, 1)
        })
        dispatch(unFriendStop(friendsarr));
        dispatch(unFriendFail(JSON.stringify(err.error)))
      })

  }
}





export function selectFriend(friend, index){
  return function(dispatch, getState) {
    const state = getState();
    var
      friendsarr = state.friends.friendsarr,
      friendsselected = state.friends.friendsselected;

    friend.isSelected = !friend.isSelected;
    friendsarr.splice(index, 1, friend);

    if(friend.isSelected) {
      friendsselected += 1;
    } else {
      friendsselected -= 1;
    }

    dispatch({
      type: FRIENDS_SELECT,
      payload: friendsarr,
      friendsselected: friendsselected
    })
  }
}

export function selectAllFriends() {
  return function(dispatch, getState) {
    const state = getState();
    var friendsarr = state.friends.friendsarr;

    friendsarr.forEach((friend, index) => {
      friendsarr[index].isSelected = true;
    })

    dispatch({
      type: FRIENDS_SELECTALL,
      payload: friendsarr,
      friendsselected: friendsarr.length
    })

  }
}



export function dropFriendsSelection() {
  return function(dispatch, getState) {
    const state = getState();
    var friendsarr = state.friends.friendsarr;

    friendsarr.forEach((friend, index) => {
      friendsarr[index].isSelected = false;
    })

    dispatch({
      type: FRIENDS_SELECTALL,
      payload: friendsarr,
      friendsselected: 0
    })

  }
}
