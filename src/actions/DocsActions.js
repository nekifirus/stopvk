import {
  DOCS_REQUEST,
  DOCS_SUCCESS,
  DOCS_FAIL,

  DOCS_SELECT,
  DOCS_SELECTALL,

  DOCSDEL_REQUEST,
  DOCSDEL_SUCCESS,
  DOCSDEL_FAIL,

} from '../constants/Docs';



import {getwithOffset, deleteWithExecute} from '../Utils/Requester';
import {apiDelDocs} from '../Utils/APImethods';


export function getDocs() {
  return (dispatch, getState) => {
    const
     state = getState();

    var
      params = {
        methodname: "docs.get",
        access_token: state.auth.access_token,
        targetarr: [],
        requestparams: {
          count: 2000,
          offset: 0
        }
      };

  dispatch({
      type: DOCS_REQUEST,
  })


  getwithOffset(params)
    .then((docsarr) => {
      dispatch({
        type: DOCS_SUCCESS,
        payload: docsarr
      });
    })
    .catch((e) => {
      return dispatch({
        type: DOCS_FAIL,
        payload: e
      });
    })

  }

}

export function delDocs() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      docsarr = state.docs.docsarr,
      docsToDelete = [], docsToSave = [];
      docsarr.forEach((doc) => {
        if(doc.isSelected) {
          docsToDelete.push(doc);
        } else {
          docsToSave.push(doc)
        }
      });

      dispatch({
        type: DOCSDEL_REQUEST
      })

      deleteWithExecute(docsToDelete, access_token, apiDelDocs)
        .then(deleted => {
          dispatch({
            type: DOCSDEL_SUCCESS,
            payload: docsToSave,
            selecteddocs: 0
          })
        })
        .catch(err => {
          err.deleted.forEach(doc => {
            let idx = docsarr.indexOf(doc);
            docsarr.splice(idx, 1)
          })
          dispatch({
            type: DOCSDEL_SUCCESS,
            payload: docsarr,
            selecteddocs: (docsToDelete.length - err.deleted.length)
          });
          dispatch({
            type: DOCSDEL_FAIL,
            payload: JSON.stringify(err.error)
          })
        })

  }
}







export function selectDoc(doc, index){
  return function(dispatch, getState){
    const state = getState();
    var
      docsarr = state.docs.docsarr,
      selecteddocs = state.docs.selecteddocs;

    doc.isSelected = !doc.isSelected;
    docsarr.splice(index, 1, doc);

    if(doc.isSelected) {
      selecteddocs += 1;
    } else {
      selecteddocs -= 1;
    }

    dispatch({
      type: DOCS_SELECT,
      payload: docsarr,
      selecteddocs: selecteddocs
    })
  }
}

export function selectAllDocs(){
  return function(dispatch, getState){
    const state = getState();
    var docsarr = state.docs.docsarr;

    docsarr.forEach((doc, index) => {
      docsarr[index].isSelected = true;
    })

    dispatch({
      type: DOCS_SELECTALL,
      payload: docsarr,
      selecteddocs: docsarr.length
    });
  }
}

export function dropDocsSelection(){
  return function(dispatch, getState){
    const state = getState();
    var docsarr = state.docs.docsarr;

    docsarr.forEach((doc, index) => {
      docsarr[index].isSelected = false;
    })

    dispatch({
      type: DOCS_SELECTALL,
      payload: docsarr,
      selecteddocs: 0
    });
  }
}
