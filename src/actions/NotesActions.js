import {
  NOTES_REQUEST,
  NOTES_SUCCESS,
  NOTES_FAIL,

  NOTES_SELECT,
  NOTES_SELECTALL,

  NOTESDEL_REQUEST,
  NOTESDEL_SUCCESS,
  NOTESDEL_FAIL,

} from '../constants/Notes';

import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator from '../Utils/linkCreator';


export function getNotes(){
  return function(dispatch, getState) {
    const
     state = getState(),
     access_token = state.auth.access_token,
     methodname = "execute.getNotes",
     count = 100;
    var
      offset = 0,
      notesarr = [];

    dispatch({
      type: NOTES_REQUEST,
    })

    getNotesRequest(notesarr);

    function getNotesRequest(notesarr){
      var requestLink = linkCreator(methodname, access_token,
                                    {count: count, offset: offset});

      jsonpRequest(requestLink)
        .then((response) => {
          notesarr = notesarr.concat(response.items);
          offset += response.items.length;
          if(offset >= response.count) {
            dispatch({
              type: NOTES_SUCCESS,
              payload: notesarr
            });
          } else {
            setTimeout(function(){
              getNotesRequest(notesarr);
            }, 333);
          }
        })
        .catch((err) => {
          err = JSON.stringify(err);
          return dispatch({
            type: NOTES_FAIL,
            payload: err
          });
        })
    }
  }
}

export function delNotes(){
  return function(dispatch, getState){
    const
      state = getState(),
      access_token = state.auth.access_token,
      methodname = "execute.delNotes",
      count = 20;

    var selectednotes = [];
    state.notes.notesarr.forEach((note) => {
      if(note.isSelected) selectednotes.push(note.id);
    })

    dispatch({type: NOTESDEL_REQUEST});

    delNotesRequest(selectednotes);

    function delNotesRequest(notesarr) {
      if(!notesarr.length) return dispatch({type: NOTESDEL_SUCCESS});
      var notesToDelete = notesarr.splice(-count, count);
      var requestLink = linkCreator(methodname, access_token,
                                    {note_ids: notesToDelete.join()});

      jsonpRequest(requestLink)
        .then((response) => {
          setTimeout(function(){
            delNotesRequest(notesarr);
          }, 333);
        })
        .catch((err) => {
          err = JSON.stringify(err);
          return dispatch({
            type: NOTESDEL_FAIL,
            payload: err
          });
        })
    }

  }
}

export function selectNote(note, index){
  return function(dispatch, getState){
    const state = getState();
    var notesarr = state.notes.notesarr;

    note.isSelected = !note.isSelected;
    notesarr.splice(index, 1, note);

    dispatch({
      type: NOTES_SELECT,
      payload: notesarr
    })
  }
}

export function selectAllNotes(){
  return function(dispatch, getState){
    const state = getState();
    var notesarr = state.notes.notesarr;

    notesarr.forEach((note, index) => {
      notesarr[index].isSelected = true;
    })

    dispatch({
      type: NOTES_SELECTALL,
      payload: notesarr
    });
  }
}
