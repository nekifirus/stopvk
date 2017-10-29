import {
  PHOTOALBUMSGET_REQUEST,
  PHOTOALBUMSGET_SUCCESS,
  PHOTOALBUMSGET_FAIL,

  PHOTOALBUM_SELECT,
  PHOTOALBUMS_SELECTALL,
  PHOTOALBUMS_DROPSELECTION,

  PHOTOALBUM_SELECTIMG,
  PHOTOALBUM_SELECTALLIMGS,
  PHOTOALBUM_DROPIMGSELECT,

  PHOTOALBUM_VIEW,
  PHOTOALBUM_CLOSE,

  PHOTOALBUM_DELSTART,
  PHOTOALBUM_DELSTOP,
  PHOTOALBUM_DELPROGRESS,
  PHOTOALBUM_DELFAIL,




} from '../constants/Photos';

import {
  DL_START,
  DL_STOP
} from '../constants/Downloader';

import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator, {executeLinkCreator} from '../Utils/linkCreator';
import imagearrPrepare, {bestImg} from '../Utils/photoPrepare';
import downloadAsZip from '../Utils/Downloader';

import {apiPhotoDel, apiUnTag, getFavePhotos, apiUnLike} from '../Utils/APImethods';

import {getwithOffset} from '../Utils/Requester';


////////////INITIAL///////////////
export function getAlbums() {
  return function(dispatch, getState){
    const
      state = getState(),
      access_token = state.auth.access_token,
      user_id = state.auth.user_id;

    function getTagget(albumsarr) {
      return new Promise(function(resolve, reject) {
        getTaggetPhotos(access_token, user_id)
          .then((album) => {
            albumsarr.splice(1, 0, album)
            return albumsarr;
          })
          .then(resolve)
          .catch(reject)
      });
    }

    function getLiked(albumsarr) {
      return new Promise(function(resolve, reject) {
        getLiketPhotos(access_token)
          .then(album => {
            albumsarr.splice(2, 0, album)
            return albumsarr;
          })
          .then(resolve)
          .catch(reject)
      });
    }


    var requestLink = linkCreator("photos.getAlbums", access_token,
                                  {need_system: 1, need_covers: 1, photo_sizes: 1});


    dispatch({
      type: PHOTOALBUMSGET_REQUEST
    })

    jsonpRequest(requestLink)
      .then((response) => {
        let albumsarr = [];
        albumsarr = response.items;

        albumsarr.forEach((item) => {
          item.thumb_src = bestImg(item.sizes, ["r", "q", "x", "m"]).src;
        })

        return albumsarr
      })
      .then(getTagget)
      .then(getLiked)
      .then((albumsarr) => {
        dispatch({
          type: PHOTOALBUMSGET_SUCCESS,
          payload: albumsarr
        })
      })
      .catch((err) => {
        err = JSON.stringify(err);
        return dispatch({
          type: PHOTOALBUMSGET_FAIL,
          payload: err
        });
      })
  }
}

async function getLiketPhotos(access_token) {

  async function getFavewithExecute(access_token) {
    var stopvalue = 1, offset = 0, response, targetarr = [];

    while(offset < stopvalue) {
      let code = getFavePhotos(offset);
      let url = linkCreator("execute", access_token, {code: code})
      try {
        response = await delay(333).then(()=>jsonpRequest(url))
      } catch (e) {
        throw e;
      }
      targetarr = targetarr.concat(response.resp1, response.resp2, response.resp3,
                                   response.resp4, response.resp5);
      offset += targetarr.length;
      stopvalue = response.count;
      console.log(targetarr)
    }
    return targetarr;
  }


  try {
    var likedphotos = await getFavewithExecute(access_token);
  } catch (e) {
    throw e;
  }

  likedphotos.forEach(item => item.liked = 1);

  let album = {
    id: -12,
    items: likedphotos,
    size: likedphotos.length,
    thumb_src: bestImg(likedphotos[0].sizes, ["r", "q", "x", "m"]).src,
    title: "Мне понравились"
  };

  return album;

}

async function getTaggetPhotos(access_token, user_id) {
  const params = {
    access_token: access_token,
    methodname: "photos.getUserPhotos",
    targetarr: [],
    requestparams: {
      count: 1000,
      offset: 0,
      photo_sizes: 1,
      sort: 1
    }
  }
  try {
    var taggetphotos = await getwithOffset(params);
  } catch (e) {
    throw e
  }

  taggetphotos.forEach(item => {
    item.tagget = 1;
    item.user_id = user_id;
  });

  let album = {
    id: -9,
    items: taggetphotos,
    size: taggetphotos.length,
    thumb_src: bestImg(taggetphotos[0].sizes, ["r", "q", "x", "m"]).src,
    title: "Фотографии со мной"
  }

  return album;
}



/////////////////SELEC//////////
export function selectAlbum(album, index) {
  return function(dispatch, getState) {
    const state = getState();
    var
      photoalbums = state.photos.photoalbums,
      selectedalbums = state.photos.selectedalbums;

    album.isSelected = !album.isSelected;
    photoalbums.splice(index, 1, album);

    if (album.isSelected) {
      selectedalbums += 1;
    } else {
      selectedalbums -= 1;
    }


    dispatch({
      type: PHOTOALBUM_SELECT,
      photoalbums: photoalbums,
      selectedalbums: selectedalbums
    })
  }
}

export function selectAllAlbums() {
  return function(dispatch, getState) {
    const state = getState();
    var photoalbums = state.photos.photoalbums;

    photoalbums.forEach((album, index) => {
      photoalbums[index].isSelected = true;
    })

    let selectedalbums = photoalbums.length;

    dispatch({
      type: PHOTOALBUMS_SELECTALL,
      photoalbums: photoalbums,
      selectedalbums: selectedalbums
    })
  }
}

export function dropSelectionAlbums() {
  return function(dispatch, getState) {
    const state = getState();
    var photoalbums = state.photos.photoalbums;

    photoalbums.forEach((album, index) => {
      photoalbums[index].isSelected = false;
    })

    dispatch({
      type: PHOTOALBUMS_DROPSELECTION,
      payload: photoalbums
    })
  }
}


export function selectImginAlbum(index, image) {
  return function(dispatch, getState) {
    const state = getState();

    var
      album_index = state.photos.albumtoview,
      photoalbums = state.photos.photoalbums,
      album = photoalbums[album_index];

    image.isSelected = !image.isSelected;
    album.items.splice(index, 1, image);

    photoalbums.splice(album_index, 1, album);

    dispatch({
      type: PHOTOALBUM_SELECTIMG,
      photoalbums: photoalbums
    })

  }
}


export function selectAllIMGinAlbum() {
  return function(dispatch, getState) {
    const state = getState();

    var
      album_index = state.photos.albumtoview,
      photoalbums = state.photos.photoalbums,
      album = photoalbums[album_index];

    album.items.forEach((item, index) => {
      album.items[index].isSelected = true;
    });

    photoalbums.splice(album_index, 1, album);


    dispatch({
      type: PHOTOALBUM_SELECTALLIMGS,
      photoalbums: photoalbums

    })

  }
}


export function dropIMGselectioninALbums () {
  return function(dispatch, getState) {
    const state = getState();

    var
      album_index = state.photos.albumtoview,
      photoalbums = state.photos.photoalbums,
      album = photoalbums[album_index];

    album.items.forEach((item, index) => {
      album.items[index].isSelected = false;
    });

    photoalbums.splice(album_index, 1, album);

    dispatch({
      type: PHOTOALBUM_DROPIMGSELECT,
      photoalbums: photoalbums
    })
  }
}





////////////////VIEWALBUM////////

export function viewAlbum(album, index) {
  return function(dispatch, getState){
    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      photoalbums = state.photos.photoalbums;


    function putItemsToAlbum(items) {
      return new Promise((resolve, reject) => {
        console.log(items)
        if (!items.length) album.items = [];
        album.items = items;



        resolve (album);

      });
    }

    Promise.resolve(album)
      .then((album) => {return getAlbumItems(album, access_token)})
      .then((items) => {
        if(!items.length) {
          return items;
        } else if (items[0].src) {
          console.log("incache"); return(items)
        } else {
          return preparePhotosToView(items);
        }
      })
      .then(putItemsToAlbum)
      .then((album) => {
        photoalbums.splice(index, 1, album);
        dispatch({
          type: PHOTOALBUM_VIEW,
          photoalbums: photoalbums,
          albumtoview: index
        })
      })
      .catch((err) => {
        err = JSON.stringify(err);
        return dispatch({
          type: PHOTOALBUMSGET_FAIL,
          payload: err
        });
      })
  }
}

export function closeAlbumView() {
  return {type: PHOTOALBUM_CLOSE}
}



/////////////del//////////////

function startDelete(){
    return {type: PHOTOALBUM_DELSTART}
}

function stopDelete(photoalbums, selectedalbums){
    return ({
      type: PHOTOALBUM_DELSTOP,
      photoalbums: photoalbums,
      selectedalbums: selectedalbums
    })

}

function progressDelete(percent) {
  return ({
      type: PHOTOALBUM_DELPROGRESS,
      payload: percent
    });
}

function failDelete(err) {
  return {type: PHOTOALBUM_DELFAIL, payload: err}
}





export function delAlbums() {
  return function(dispatch, getState) {

    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      photoalbums = state.photos.photoalbums,
      albumstodelete = getSelected(photoalbums, true),
      albumstosave = getSelected(photoalbums, false);

    function progress(percent) {
      dispatch(progressDelete(percent))
    }

    dispatch(startDelete());


    deleteAlbums(albumstodelete, access_token, progress)
      .then(() => {
        photoalbums = albumstosave;
        dispatch((stopDelete(photoalbums, 0)))
      })
      .catch((err) => {
        err.deleted.forEach(album => {
          let idx = photoalbums.indexOf(album);
          photoalbums.splice(idx, 1);
        })
        dispatch((stopDelete(photoalbums, Number(albumstodelete) - Number(err.deleted))));
        dispatch(failDelete(err.error))
      })
  }
}

async function deleteAlbums(albums, access_token, onUpdate) {

  var initiallength = albums.length;
  var deleted = [];

  while(albums.length) {
    let album = albums.pop();
    try {
      let images = await getAlbumItems(album, access_token);
      if (images.length) await deleteImages(images, access_token);
      if (album.id === (-6 || -7 || -15 || -9 || -12)) throw new Error("System");
      let url = linkCreator("photos.deleteAlbum",
                    access_token, {album_id: album.id})
      await delay(333).then(()=>jsonpRequest(url));
    } catch (e) {
      if (e.message === "System") {

      } else {
        let err = {
          error: e,
          deleted: deleted
        }
        throw err;
      }
    }
    deleted.push(album);
    if (typeof onUpdate === "function") {
      onUpdate(Math.floor(100 - albums.length/initiallength*100));
    }
  }
  return deleted;
}



export function delSelectedInAlbum(){
  return function (dispatch, getState) {

    function progress(percent) {
      dispatch(progressDelete(percent))
    }

    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      photoalbums = state.photos.photoalbums,
      selectedalbums = state.photos.selectedalbums,
      album_index = state.photos.albumtoview,
      album = photoalbums[album_index];

    var
     imagestoDelete = getSelected(album.items, true),
     imagesToSave = getSelected(album.items, false);

    dispatch(startDelete());

    deleteImages(imagestoDelete, access_token, progress)
      .then(() => {
        album.items = imagesToSave;
        album.size = album.items.length;
        if (!album.size) album.thumb_id = '';
        photoalbums.splice(album_index, 1, album);
        dispatch(stopDelete(photoalbums, selectedalbums))
      })
      .catch((err) => {
        err.deleted.forEach(item => {
          let idx = album.items.indexOf(item);
          album.items.splice(idx, 1)
        })
        album.size = album.items.length;
        photoalbums.splice(album_index, 1, album);
        dispatch(stopDelete(photoalbums, selectedalbums))
        dispatch(failDelete(err.error))
      })

  }
}


async function deleteImages(items, access_token, onUpdate) {

  if(items[0].tagget) return unTagPhotos(items, access_token, onUpdate);
  if(items[0].liked) return unLikePhotos(items, access_token, onUpdate);

  const
    count = 20,
    initiallength = items.length;

  var deleted = [];


  while(items.length) {
    let todel = items.splice(-count);
    let url = executeLinkCreator(
      todel.map(item => apiPhotoDel(item.id)),
      access_token
    );
    console.log(url)
    try {
      await delay(333).then(()=>jsonpRequest(url));
    } catch (e) {
      var err = {
        deleted: deleted,
        error: e
      };
      console.log(err)
      throw err;
    }
    deleted.push(todel);
    if (typeof onUpdate === "function") {
      onUpdate(Math.floor(100 - items.length/initiallength*100));
    }
  }
  return;
}



async function unTagPhotos(items, access_token, onUpdate) {

  const count = 10, initiallength = items.length;
  var deleted = [];

  while(items.length) {
    let todel = items.splice(-count);
    console.log(todel)
    let url = executeLinkCreator(
      todel.map(item => apiUnTag(item.owner_id, item.id, item.user_id)),
      access_token
    );
    try {
      await delay(333).then(()=>jsonpRequest(url));
    } catch (e) {
      var err = {
        deleted: deleted,
        error: e
      };
      console.log(err)
      throw err;
    }
    deleted.push(todel);
    if (typeof onUpdate === "function") {
      onUpdate(Math.floor(100 - items.length/initiallength*100));
    }
  }

  return;
}

async function unLikePhotos(items, access_token, onUpdate) {

  const count = 2, initiallength = items.length;
  var deleted = [];

  while(items.length) {
    let todel = items.splice(-count);
    console.log(todel)
    let url = executeLinkCreator(
      todel.map(item => apiUnLike("photo", item.owner_id, item.id)),
      access_token
    );
    try {
      await delay(333).then(()=>jsonpRequest(url));
    } catch (e) {
      var err = {
        deleted: deleted,
        error: e
      };
      console.log(err)
      throw err;
    }
    deleted.push(todel);
    if (typeof onUpdate === "function") {
      onUpdate(Math.floor(100 - items.length/initiallength*100));
    }
  }

  return deleted;
}


/////////////////////////SAVING//////////////////////

export function saveSelectedAlbums() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      photoalbums = state.photos.photoalbums;

    var selectedalbums = [];

    photoalbums.forEach((album) => {
      if (album.isSelected) selectedalbums.push(album);
    })

    function startDownload(){
        return new Promise(function(resolve, reject) {
          dispatch({type: DL_START})
          resolve();
        });
    }


    var promisedeed = selectedalbums.reduce((prev, current) => {
      return prev.then(() => {return savecurrentAlbum(current, dispatch, access_token)})
    }, startDownload())

    promisedeed
      .then(()=>{
        dispatch({type: DL_STOP})
      })
      .catch((err) => {
        err = JSON.stringify(err);
        return dispatch({
          type: PHOTOALBUMSGET_FAIL,
          payload: err
        });
      })

  }
}

export function saveAlbum(album) {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    dispatch({type: DL_START})

    savecurrentAlbum(album, dispatch, access_token)
      .then(() => {
        dispatch({type: DL_STOP})
      })
  }
}


export function saveSelectedImagesInAlbum() {
  return function(dispatch, getState) {
    const state = getState();
    var
      album_index = state.photos.albumtoview,
      album = state.photos.photoalbums[album_index];


    var imagestosave = getSelected(album.items, true);

    dispatch({type: DL_START})


    downloadAsZip(imagestosave, album.title + "-Выбранные", dispatch)
      .then(() => {dispatch({type: DL_STOP})})
  }
}

function savecurrentAlbum(album, dispatch, access_token) {
  return new Promise(function(resolve, reject) {
    var imagestosave = [];

    getAlbumItems(album, access_token)
      .then((items) => {
        if(items[0].src) {console.log("incache"); return(items)};
        return preparePhotosToView(items);
      })
      .then((items) => {
        resolve(downloadAsZip(imagestosave, album.title, dispatch))
      })
      .catch((err) => {
        err = JSON.stringify(err);
        dispatch({
          type: PHOTOALBUMSGET_FAIL,
          payload: err
        });
        reject(err);
      })
  });


}






///////////UTILS///////////////////
function getAlbum(album, access_token) {
  return new Promise((resolve, reject) => {

    const params = {
      access_token: access_token,
      methodname: "photos.get",
      targetarr: [],
      requestparams: {
        count: 1000,
        offset: 0,
        album_id: getAlbumID(album.id),
        photo_sizes: 1,
      }
    }

    getwithOffset(params)
      .then((items) => {console.log(items); resolve(items)})
      .catch(reject)
  })
}

function getAlbumItems(album, access_token) {
  return new Promise ((resolve, reject) => {
      if (album.items) {
        console.log("Итемсы есть", album)
        resolve(album.items);
      } else {
        resolve(getAlbum(album, access_token))
      }
 })
}

function preparePhotosToView(items) {
  return new Promise((resolve, reject) => {
    imagearrPrepare(items).then(resolve).catch(reject)
  })
}

function getAlbumID(id) {
  switch(id) {
    case -6: return "profile";
    case -7: return "wall";
    case -15: return "saved";
    default: return id;
  }
}


function delay (ms, value) {
  return new Promise(function(resolve) {
    setTimeout(() => {resolve(value)}, ms)
  });
}



function getSelected(arr, bool) {
  let resqarr = [];
  arr.forEach((item) => {
    if (!!item.isSelected === bool) resqarr.push(item)
  })
  return resqarr;
}
