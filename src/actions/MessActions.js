import {
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,

  MESSAGEDEL_REQUEST,
  MESSAGEDEL_SUCCESS,
  MESSAGEDEL_FAIL
} from '../constants/Messages';

import {getwithOffset, deleteWithExecute} from '../Utils/Requester';
import {apiDelMessages} from '../Utils/APImethods';


export function initMessages() {
  return function(dispatch, getState) {
    const
      state = getState(),
      user_id = state.auth.user_id;

    var params = {
        access_token: state.auth.access_token,
        methodname: "messages.getDialogs",
        targetarr: [],
        requestparams: {
          offset: 0,
          count: 200,
        }
    };

    const progress = (percent => {
      dispatch({
        type: MESSAGE_REQUEST,
        payload: percent,
        message: "Получаю список диалогов"
      })
    });

    const getIdForDialogs = (dialogsarr => {
      dialogsarr.forEach(dialog =>{
        if (dialog.message.chat_id) {
          dialog.id = dialog.message.chat_id + 2000000000;
        } else {
          dialog.id = dialog.message.user_id;
        }
        dialog.user_id = user_id;
      })
      return dialogsarr;
    })

    getwithOffset(params, progress)
      .then(getIdForDialogs)
      .then(dialogsarr => {
        dispatch({
          type: MESSAGE_SUCCESS,
          payload: dialogsarr
        })
      })
      .catch(e => {
        dispatch({
          type: MESSAGE_FAIL,
          payload: e
        })
      })
 }
}



export function delMessages() {
  return function(dispatch, getState) {

    function progress(percent) {
      dispatch({
        type: MESSAGEDEL_REQUEST,
        percent: percent
      })
    }

    const
      state = getState(),
      access_token = state.auth.access_token;

    var dialogsarr = state.mess.dialogsarr;

    deleteWithExecute(dialogsarr, access_token, apiDelMessages, progress)
      .then(deleted => {
        dispatch({
          type: MESSAGEDEL_SUCCESS,
          payload: []
        })
      })
    .catch(err => {
      err.deleted.forEach(dialog => {
        let idx = dialogsarr.indexOf(dialog);
        dialogsarr.splice(idx, 1)
      })
      dispatch({
        type: MESSAGEDEL_SUCCESS,
        payload: dialogsarr
      });
      dispatch({
        type: MESSAGEDEL_FAIL,
        payload: JSON.stringify(err.error)
      })
    })

  }
}
