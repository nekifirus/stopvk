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


import {getwithOffset, deleteWithExecute} from '../Utils/Requester';
import {apiDelNotes} from '../Utils/APImethods';

export function getNotes(){
  return function(dispatch, getState) {
    const
     state = getState();


    var params = {
      access_token: state.auth.access_token,
      methodname: "notes.get",
      targetarr: [],
      requestparams: {
        count: 100,
        offset: 0
      }
    }


    dispatch({
      type: NOTES_REQUEST,
    })

    getwithOffset(params)
      .then(notes => {
        dispatch({
          type: NOTES_SUCCESS,
          payload: notes
        })
      })
      .catch(e => {
        dispatch({
          type: NOTES_FAIL,
          payload: e.toString()
        })
      })

  }
}



export function delNotes() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      notesarr = state.notes.notesarr,
      notesToDelete = [], notesToSave = [];

      notesarr.forEach((note) => {
        if(note.isSelected) {
          notesToDelete.push(note);
        } else {
          notesToSave.push(note)
        }
      });

      var initiallength = notesToDelete.length;

      dispatch({
        type: NOTESDEL_REQUEST
      })

      deleteWithExecute(notesToDelete, access_token, apiDelNotes)
        .then(deleted => {
          dispatch({
            type: NOTESDEL_SUCCESS,
            payload: notesToSave,
            selectednotes: 0
          })
        })
        .catch(err => {
          err.deleted.forEach(note => {
            let idx = notesarr.indexOf(note);
            notesarr.splice(idx, 1)
          })
          dispatch({
            type: NOTESDEL_SUCCESS,
            payload: notesarr,
            selectednotes: (initiallength - err.deleted.length)
          });
          dispatch({
            type: NOTESDEL_FAIL,
            payload: JSON.stringify(err.error)
          })
        })

  }
}





export function selectNote(note, index){
  return function(dispatch, getState){
    const state = getState();
    var
      notesarr = state.notes.notesarr,
      selectednotes = state.notes.selectednotes;

    note.isSelected = !note.isSelected;
    notesarr.splice(index, 1, note);

    if(note.isSelected) {
      selectednotes += 1;
    } else {
      selectednotes -= 1;
    }

    dispatch({
      type: NOTES_SELECT,
      payload: notesarr,
      selectednotes: selectednotes
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
      payload: notesarr,
      selectednotes: notesarr.length
    });
  }
}

export function dropNotesSelection(){
  return function(dispatch, getState){
    const state = getState();
    var notesarr = state.notes.notesarr;

    notesarr.forEach((note, index) => {
      notesarr[index].isSelected = false;
    })

    dispatch({
      type: NOTES_SELECTALL,
      payload: notesarr,
      selectednotes: 0
    });
  }
}
