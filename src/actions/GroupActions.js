import {
  GROUPS_REQUEST,
  GROUPS_SUCCESS,
  GROUPS_FAIL,

  GROUPS_SELECT,

  GROUPSDEL_REQUEST,
  GROUPSDEL_SUCCESS,
  GROUPSDEL_FAIL
} from '../constants/Groups';

import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator from '../Utils/linkCreator';

export function selectGroup (item, index) {
  return function(dispatch, getState) {
    const state = getState();
    var
      groupsarr = state.groups.groupsarr;

    item.isSelected = !item.isSelected;
    groupsarr.splice(index, 1, item);

    dispatch({
      type: GROUPS_SELECT,
      payload: groupsarr
    })


  }
}


export function getGroups() {
  return function(dispatch, getState) {
    const
      state = getState(),
      params = {
          access_token: state.auth.access_token,
          methodname: 'execute.getGroups',
          groupsarr: [],
          linkparams: {
            offset: 0,
            count: 500,
          }
      };

    dispatch({
      type: GROUPS_REQUEST
    })
    getGroupsRequest(params);


    function getGroupsRequest(params) {
      var requestLink = linkCreator(params.methodname,
                                    params.access_token,
                                    params.linkparams);
      dispatch({
        type: GROUPS_REQUEST,
        payload: params.groupsarr.length
      })

      jsonpRequest(requestLink)
        .then((response) => {
          console.log(response)

          params.groupsarr = params.groupsarr.concat(response.items);
          params.linkparams.offset += response.items.length;
          console.log(params.groupsarr, params.linkparams.offset)
          if(params.linkparams.offset >= response.count) {
            dispatch({
              type: GROUPS_SUCCESS,
              payload: params.groupsarr
            })
          } else {
            setTimeout(function() {
              getGroupsRequest(params)
            }, 333);
          }
        })
        .catch((err) => {
          err = JSON.stringify(err);
          return dispatch({
            type: GROUPS_FAIL,
            payload: err
          });
        })

    }
  }
}




export function leaveGroups () {
  return function (dispatch, getState) {
    const
      state = getState(),
      count = 5;
    var  params = {
        access_token: state.auth.access_token,
        methodname: 'execute.groupsLeave',
        groupsarr: []
      };

    state.groups.groupsarr.forEach((item) => {
      if (!item.isSelected) params.groupsarr.push(item.id);
    })


    dispatch({
      type: GROUPSDEL_REQUEST,
      payload: params.groupsarr.length
    });

    leaveGroupsRequest(params);

    function leaveGroupsRequest(params) {
      if (!params.groupsarr.length) return dispatch({type: GROUPSDEL_SUCCESS})

      var groupstoLeave = params.groupsarr.splice(-count, count).join();
      console.log(groupstoLeave)
      var requestLink = linkCreator(params.methodname, params.access_token,
                                    {group_ids: groupstoLeave});
      dispatch({
        type: GROUPSDEL_REQUEST,
        payload: params.groupsarr.length
      });

      jsonpRequest(requestLink)
        .then((response) => {
          console.log(response)
          dispatch({
            type: GROUPSDEL_REQUEST,
            payload: params.groupsarr.length
          });
          setTimeout(function() {
            leaveGroupsRequest(params)
          }, 333);
        })
        .catch((err) => {
          err = JSON.stringify(err);
          return dispatch({
            type: GROUPSDEL_FAIL,
            payload: err
          });
        })

    }

  }
}
