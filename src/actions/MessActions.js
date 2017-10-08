import {
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,

  MESSAGEDEL_REQUEST,
  MESSAGEDEL_SUCCESS,
  MESSAGEDEL_FAIL
} from '../constants/Messages';

import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator from '../Utils/linkCreator';



export function getMessages() {
  return function(dispatch, getState) {
    const state = getState();
    const params = {
        access_token: state.auth.access_token,
        linkparams: {
          offset: 0,
          count: 50,
        }
    };


    function getMessagesRequest(params, dialogsarr, chatsarr) {
      return new Promise((resolve, reject) => {
        var requestLink = linkCreator(params.methodname,
                                      params.access_token,
                                      params.linkparams);

        jsonpRequest(requestLink)
          .then((response) => {
            dialogsarr = dialogsarr.concat(response.items);
            chatsarr = chatsarr.concat(response.chats);
            params.linkparams.offset = params.linkparams.offset + params.linkparams.count;

            if (params.linkparams.offset >= response.count) {

              resolve({dialogs: dialogsarr, chats: chatsarr})
            } else {
              setTimeout(function() {
                getMessagesRequest(params, dialogsarr, chatsarr)
              }, 333);
            }
          })
          .catch((err) => {
            reject (err);
          })
        });
    };




    function getDialogs(params) {
      return new Promise((resolve, reject) => {
        var dialogsarr = [];
        var chatsarr = [];

        params.methodname = "execute.messages_getDialog";
        params.linkparams.count = 200;
        params.linkparams.offset = 0;

        getMessagesRequest(params, dialogsarr, chatsarr)
          .then((resp) => resolve (resp))
          .catch((err) => {console.log(err); reject (err)})
      })
    };

    function getMessCountinDialogs(access_token, user_ids) {
      return new Promise((resolve, reject) => {
        const methodname = "execute.messages_getCount";
        var messagesarr = [];

        countRequest(user_ids);

        function countRequest(user_ids) {
          if (!user_ids.length) return(resolve(messagesarr));
          var user_idstoreq = user_ids.splice(-20, 20).join();
          var requestLink = linkCreator(methodname, access_token,
                                        {user_ids: user_idstoreq});
          dispatch({
            type: MESSAGE_REQUEST,
            message: 'Осталось обработать ' + user_ids.length + ' диалогов'
          })
          jsonpRequest(requestLink)
            .then((resp) => {
              messagesarr = messagesarr.concat(resp.items);
              setTimeout(function() {
                countRequest(user_ids);
              }, 333);
            })
            .catch((err) => {console.log(err); reject (err)})
        }
      })
    }






    getDialogs(params)
      .then((resp) => {
        var idsarr = [];
        dispatch({
          type: MESSAGE_REQUEST,
          message: 'Получил ' + (resp.dialogs.length + resp.chats.length) + ' диалогов'
        });
        resp.chats = resp.chats.map((chat_id) => (chat_id += 2000000000));
        idsarr = resp.dialogs.concat(resp.chats);
        return idsarr;
      })
      .then((idsarr) => {
        dispatch({
          type: MESSAGE_REQUEST,
          message: 'Получаю количество сообщений в диалогах'
        });
        return getMessCountinDialogs(params.access_token, idsarr);
      })
      .then((messagesarr) => {
        var messagescount = messagesarr.reduce((prev, current) => {
          return (prev + current.count);
        }, 0);
        dispatch({
          type: MESSAGE_SUCCESS,
          payload: messagesarr,
          count: messagescount
        })
      })
      .catch((err) => {
        err = JSON.stringify(err);
        return dispatch({
          type: MESSAGE_FAIL,
          payload: err
        });
      })


  };
};



export function delMessages(){
  return function(dispatch, getState) {
    const state = getState(),
      params = {
        access_token: state.auth.access_token,
        methodname: "execute.messages_deleteDialog",
        messagesarr: state.mess.messagesarr,
        chatsarr: state.mess.chatsarr
      };

    function prepareMessages(arr, count) {
      var returnstring = [];
      arr = arr.splice(-count, count);

      for (var mess of arr) {
        while(mess.count > 10000) {
          returnstring.push(mess.user_id);
          mess.count -= 10000;
        }
        returnstring.push(mess.user_id);
      };

      returnstring = returnstring.join();
      return returnstring;
    }

    dispatch({
      type: MESSAGEDEL_REQUEST,
      payload: params.messagesarr.length
    });


    delMessagesRequest(params);

    function delMessagesRequest(params) {

      if (!params.messagesarr.length) return (dispatch({type: MESSAGEDEL_SUCCESS}))


      const count = 2;

      var dialogsToDelete = prepareMessages(params.messagesarr, count);

      var requestLink = linkCreator(params.methodname,
                                    params.access_token,
                                    { user_ids: dialogsToDelete });

      jsonpRequest(requestLink)
        .then((response) => {
          dispatch({
            type: MESSAGEDEL_REQUEST,
            payload: params.messagesarr.length
          })
          setTimeout(function() {
           delMessagesRequest(params);
          }, 333);
        })
        .catch((err) => {
          if (err.error_code === 9) {
            params.messagesarr = params.messagesarr.concat(err.user_ids);
            setTimeout(function() {
             delMessagesRequest(params);
            }, 3333);
          }
          err = JSON.stringify(err);
          return dispatch({
            type: MESSAGEDEL_FAIL,
            payload: err
          });
        })

    }

  }
}
