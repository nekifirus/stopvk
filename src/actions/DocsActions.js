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

import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator from '../Utils/linkCreator';



export function getDocs(){
  return function(dispatch, getState) {
    const
     state = getState(),
     access_token = state.auth.access_token,
     methodname = "execute.getDocs",
     count = 100;
    var
      offset = 0,
      docsarr = [];

    dispatch({
      type: DOCS_REQUEST,
    })

    getDocsRequest(docsarr);

    function getDocsRequest(docsarr){
      var requestLink = linkCreator(methodname, access_token,
                                    {count: count, offset: offset});

      jsonpRequest(requestLink)
        .then((response) => {
          docsarr = docsarr.concat(response.items);
          offset += response.items.length;
          if(offset >= response.count) {
            dispatch({
              type: DOCS_SUCCESS,
              payload: docsarr
            });
          } else {
            setTimeout(function(){
              getDocsRequest(docsarr);
            }, 333);
          }
        })
        .catch((err) => {
          err = JSON.stringify(err);
          return dispatch({
            type: DOCS_FAIL,
            payload: err
          });
        })
    }
  }
}

export function delDocs(){
  return function(dispatch, getState){
    const
      state = getState(),
      access_token = state.auth.access_token,
      owner_id = state.auth.user_id,
      methodname = "execute.delDocs",
      count = 20;

    var selecteddocs = [];
    state.docs.docsarr.forEach((doc) => {
      if(doc.isSelected) selecteddocs.push(doc.id);
    })

    dispatch({type: DOCSDEL_REQUEST});

    delDocsRequest(selecteddocs);

    function delDocsRequest(docsarr) {
      if(!docsarr.length) return dispatch({type: DOCSDEL_SUCCESS});
      var docsToDelete = docsarr.splice(-count, count);
      var requestLink = linkCreator(methodname, access_token,
                                    {doc_ids: docsToDelete.join(),
                                     owner_id: owner_id });

      jsonpRequest(requestLink)
        .then((response) => {
          setTimeout(function(){
            delDocsRequest(docsarr);
          }, 333);
        })
        .catch((err) => {
          err = JSON.stringify(err);
          return dispatch({
            type: DOCSDEL_FAIL,
            payload: err
          });
        })
    }

  }
}

export function selectDoc(doc, index){
  return function(dispatch, getState){
    const state = getState();
    var docsarr = state.docs.docsarr;

    doc.isSelected = !doc.isSelected;
    docsarr.splice(index, 1, doc);

    dispatch({
      type: DOCS_SELECT,
      payload: docsarr
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
      payload: docsarr
    });
  }
}
