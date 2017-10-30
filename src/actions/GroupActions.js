import {
  GROUPS_REQUEST,
  GROUPS_SUCCESS,
  GROUPS_FAIL,

  GROUPS_SELECT,

  GROUPSDEL_REQUEST,
  GROUPSDEL_SUCCESS,
  GROUPSDEL_FAIL
} from '../constants/Groups';



import {getwithOffset, deleteWithExecute} from '../Utils/Requester';
import {apiLeaveGroups} from '../Utils/APImethods';



export function getGroups() {
  return function(dispatch, getState) {
    const
      state = getState(),
      params = {
          access_token: state.auth.access_token,
          methodname: 'groups.get',
          targetarr: [],
          requestparams: {
            offset: 0,
            count: 500,
            extended: 1
          }
      };

    function groupReqProgress(percent) {
      dispatch({
        type: GROUPS_REQUEST,
        percent: percent
      })
    }

    groupReqProgress(0);

    getwithOffset(params, groupReqProgress)
      .then(groupsarr => {
        dispatch({
          type: GROUPS_SUCCESS,
          payload: groupsarr
        })
      })
      .catch(err => {
        dispatch({
          type: GROUPS_FAIL,
          payload: err.toString()
        })
      })
  }
}



export function leaveGroups() {
  return function(dispatch, getState) {

    function groupsdelProgress(percent) {
      dispatch({
        type: GROUPSDEL_REQUEST,
        payload: percent
      })
    }

    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      groupsarr = state.groups.groupsarr,
      groupsToDelete = [], groupsToSave = [];
      groupsarr.forEach((group) => {
        if(group.isSelected) {
          groupsToDelete.push(group);
        } else {
          groupsToSave.push(group)
        }
      });

      groupsdelProgress(0);

      deleteWithExecute(groupsToDelete, access_token, apiLeaveGroups, groupsdelProgress)
        .then(() => {
          dispatch({
            type: GROUPSDEL_SUCCESS,
            payload: groupsToSave,
            selecteddocs: 0
          })
        })
        .catch(err => {
          err.deleted.forEach(group => {
            let idx = groupsarr.indexOf(group);
            groupsarr.splice(idx, 1)
          })
          dispatch({
            type: GROUPSDEL_SUCCESS,
            payload: groupsarr,
            selectedgroups: (groupsToDelete.length - err.deleted.length)
          });
          dispatch({
            type: GROUPSDEL_FAIL,
            payload: JSON.stringify(err.error)
          })
        })

  }
}















/////SELECT/////////


export function selectGroup (item, index) {
  return function(dispatch, getState) {
    const state = getState();
    var
      groupsarr = state.groups.groupsarr,
      selectedgroups = state.groups.selectedgroups;

    item.isSelected = !item.isSelected;
    groupsarr.splice(index, 1, item);

    if (item.isSelected) {
      selectedgroups += 1;
    } else {
      selectedgroups -= 1;
    }

    dispatch({
      type: GROUPS_SELECT,
      payload: groupsarr,
      selectedgroups: selectedgroups
    })
  }
}

export function selectAllGroups () {
  return function(dispatch, getState) {
    const state = getState();
    var
      groupsarr = state.groups.groupsarr;

    groupsarr.forEach(group => {
      group.isSelected = true;
    })

    dispatch({
      type: GROUPS_SELECT,
      payload: groupsarr,
      selectedgroups: groupsarr.length
    })

  }
}


export function dropGroupsSelection () {
  return function(dispatch, getState) {
    const state = getState();
    var
      groupsarr = state.groups.groupsarr;

    groupsarr.forEach(group => {
      group.isSelected = false;
    })

    dispatch({
      type: GROUPS_SELECT,
      payload: groupsarr,
      selectedgroups: 0
    })

  }
}
