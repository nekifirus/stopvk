
import {
  //запрос информации
  WALLINDEX_SUCCESS,
  WALLINDEX_FAIL,
  WALLINDEX_REQUEST,
  //удаление постов
  WALLDELL_START,
  WALLDELL_STOP,
  WALLDELL_WORK,
  WALLDELL_ERROR,
  WALLDELL_SUCCESS
} from '../constants/Wall';

import jsonp from 'jsonp';

export function stopWallDelete() {
  return { type: WALLDELL_STOP };
};

export function startWallDelete() {
  return function(dispatch, getState) {
    const state = getState();
    const access_token = state.auth.access_token;
    var posts = state.wall.posts;


    dispatch({type: WALLDELL_START});

    deleteWallPosts(access_token, posts, getState, dispatch);
  };
};


function deleteWallPosts (access_token, posts, getState, dispatch) {
  const state = getState();
  var trigger = state.wall.trigger;
  var count = 3; //сколько удалять за проход.
  var postsToDelete; //переменная для хранения постов для удаления за проход

  //функция подготовки постов для удаления
  //берет 3 последних записи на стене - возвращает строку id записей
  //ВК массивы не берет аргументами, только строки(
  function postsPrepare (posts, count) {
    let arr = [];
    //берем -count- единиц с конца списка постов
    posts = posts.splice(-count, count);
    //забираем из вырезанного массива постов только id - больше для удаления не нужно
    for (var key of posts) {
      arr.push(key.id);
    };
    //превращаем массив id для удаления в строку. ВК не берет массивы
    arr = arr.join();
    //возвращаем полученную строку
    return arr;
  };

  //реализация кнопки Стоп. Если триггер false то возврат
  if (!trigger) return;
  //второе условие - если массив постов пуст - возврат
  if (!posts.length) return dispatch({type: WALLDELL_SUCCESS});


  //берем строчку с id постов
  postsToDelete = postsPrepare(posts, count);
  //делаем запрос
  jsonp(`https://api.vk.com/method/execute.wallposts_delete?access_token=${access_token}&count=${count}&posts=${postsToDelete}&v=5.68`,
   function(err, data) {
     if (err) dispatch({
         type: WALLDELL_ERROR,
         payload: err
         });
     if (data) {
       //сообщаем что удалили посты и оставшееся количество на стене
       dispatch ({
         type: WALLDELL_WORK,
         payload: posts.length
       });
       //ну и чтобы не забанили через таймаут вызываем текущую функцию опять
       setTimeout(function() {
        deleteWallPosts(access_token, posts, getState, dispatch);
       }, 333);
     }; //if data
   } // function(err, data)
  ); //jsonp
} // function deleteWallPosts

















export function requestWallPosts() {
  return function(dispatch, getState) {

    const state = getState();
    const owner_id = state.auth.user_id;
    const access_token = state.auth.access_token;

    var
      offset = 0,
      postscount = 1,
      postlist = [];



    function requestCycle(offset, postscount) {
      if (offset > postscount) return dispatch({
          type: WALLINDEX_SUCCESS,
          payload: postlist
        });

      jsonp(`https://api.vk.com/method/execute.wallposts_get?access_token=${access_token}&owner_id=${owner_id}&offset=${offset}&v=5.68`,
        function(err, data) {
          if (err) {
            dispatch({
              type: WALLINDEX_FAIL,
              payload: err
            });
          };
          if (data) {
            offset = data.response[0];
            postscount = data.response[1];
            postlist = postlist.concat(data.response[2]);
            dispatch({
              type: WALLINDEX_REQUEST,
              payload: postlist.length
            });
            setTimeout(function() {
              requestCycle(offset, postscount)
            }, 333);
          };
        });
    };


    dispatch({
      type: WALLINDEX_REQUEST
    });
    requestCycle(offset, postscount);



  }
};
