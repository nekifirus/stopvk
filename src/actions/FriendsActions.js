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




export function getFriends() {
  return function(dispatch, getState) {
    FriendsGet(dispatch, getState)
  }
}

export function selectFriend(friend, index){
  return function(dispatch, getState) {
    const state = getState();
    var friendsarr = state.friends.friendsarr;

    friend.isSelected = !friend.isSelected;
    friendsarr.splice(index, 1, friend);

    dispatch({
      type: FRIENDS_SELECT,
      payload: friendsarr
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
      payload: friendsarr
    })

  }
}


export function unFriend() {
  return function(dispatch, getState) {

    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "execute.unFriend",
      count = 10;

    var friendstodellarr = [];



    state.friends.friendsarr.forEach((friend) => {
      if (friend.isSelected) friendstodellarr.push(friend.id)
    })


    dispatch({
      type: FRIENDSDEL_REQUEST
    });

    Promise.resolve(unFriendRequest(friendstodellarr))
      .then(() => {
        setTimeout(function() {
          FriendsGet(dispatch, getState)
        }, 3333)
      })

    function unFriendRequest(friendsarr) {
      if(!friendstodellarr.length) return dispatch({type: FRIENDSDEL_SUCCESS});
      var friendsToDelete = friendstodellarr.splice(-count, count);
      var requestLink = linkCreator(methodname, access_token,
                                    {user_ids: friendsToDelete.join()});

      dispatch({
        type: FRIENDSDEL_REQUEST
      });

      jsonpRequest(requestLink)
        .then((response) => {

          setTimeout(function() {
            unFriendRequest(friendsarr)
          }, 333)
        })
        .catch((err) => {
          err = JSON.stringify(err);
          return dispatch({
            type: FRIENDSDEL_FAIL,
            payload: err
          });
        })


    }

  }
}

function FriendsGet(dispatch, getState) {
  const state = getState();
  var params = {
    access_token: state.auth.access_token,
    methodname: "friends.get",
    linkparams: {
      count: 5000,
      offset: 0,
      fields: "domain,photo_max,common_count",
      order: "hints"
    },
    friendsarr: []
  };


  dispatch({
    type: FRIENDS_REQUEST
  });

  getFriendsRequest(params);

  function getFriendsRequest(params){
    const { methodname, access_token } = params;

    var requestLink = linkCreator(methodname, access_token, params.linkparams);

    dispatch({
      type: FRIENDS_REQUEST,
      payload: params.friendsarr.length
    })

    jsonpRequest(requestLink)
      .then((response) => {
        params.friendsarr = params.friendsarr.concat(response.items);
        params.linkparams.offset = params.linkparams.offset + response.items.length;

        if(params.linkparams.offset >= response.count) {
          dispatch({
            type: FRIENDS_SUCCESS,
            payload: params.friendsarr
          });
        } else {
          setTimeout(function() {
            getFriendsRequest(params)
          }, 333);
        }
      })
      .catch((err) => {
        err = JSON.stringify(err);
        return dispatch({
          type: FRIENDS_FAIL,
          payload: err
        });
      });
  }
}
