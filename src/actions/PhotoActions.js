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
  PHOTOALBUM_CLOSE

} from '../constants/Photos';

import {
  DL_START,
  DL_STOP
} from '../constants/Downloader';

import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator from '../Utils/linkCreator';
import imagearrPrepare, {bestImg} from '../Utils/photoPrepare';
import downloadAsZip from '../Utils/Downloader'


////////////INITIAL///////////////
export function getAlbums() {
  return function(dispatch, getState){
    const
      state = getState(),
      access_token = state.auth.access_token;


    var requestLink = linkCreator("photos.getAlbums", access_token,
                                  {need_system: 1, need_covers: 1, photo_sizes: 1});

    function getCover(items) {
      return new Promise(function(resolve, reject) {
        var ArrayOfPromises = items.map(function(item){
          return bestImg(item.sizes, ["r", "q", "x", "m"]);
        });
        Promise.all(ArrayOfPromises)
          .then(resolve)
          .catch((err) => console.log(err));
      });
    }

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
      selectedalbums.push(album);
    } else {
      var idx = selectedalbums.indexOf(album);
      selectedalbums.splice(idx, 1);
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

    dispatch({
      type: PHOTOALBUMS_SELECTALL,
      payload: photoalbums
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
      album = state.photos.albumtoview,
      photoalbums = state.photos.photoalbums,
      selectedalbums = state.photos.selectedalbums,
      indexOfAlbum;


    image.isSelected = !image.isSelected;
    album.items.splice(index, 1, image);

    indexOfAlbum = photoalbums.indexOf(album);
    photoalbums.splice(indexOfAlbum, 1, album);

    if (album.isSelected) {
      let idx = selectedalbums.indexOf(album);
      selectedalbums.splice(idx, 1, album)
    }

    dispatch({
      type: PHOTOALBUM_SELECTIMG,
      photoalbums: photoalbums,
      selectedalbums: selectedalbums,
      albumtoview: album
    })

  }
}


export function selectAllIMGinAlbum() {
  return function(dispatch, getState) {
    const state = getState();

    var
      album = state.photos.albumtoview,
      photoalbums = state.photos.photoalbums,
      selectedalbums = state.photos.selectedalbums,
      indexOfAlbum;

    album.items.forEach((item, index) => {
      album.items[index].isSelected = true;
    });

    indexOfAlbum = photoalbums.indexOf(album);
    photoalbums.splice(indexOfAlbum, 1, album);

    if (album.isSelected) {
      let idx = selectedalbums.indexOf(album);
      selectedalbums.splice(idx, 1, album)
    }

    dispatch({
      type: PHOTOALBUM_SELECTALLIMGS,
      photoalbums: photoalbums,
      selectedalbums: selectedalbums,
      albumtoview: album
    })

  }
}


export function dropIMGselectioninALbums () {
  return function(dispatch, getState) {
    const state = getState();

    var
      album = state.photos.albumtoview,
      photoalbums = state.photos.photoalbums,
      selectedalbums = state.photos.selectedalbums,
      indexOfAlbum;

    album.items.forEach((item, index) => {
      album.items[index].isSelected = false;
    });

    indexOfAlbum = photoalbums.indexOf(album);
    photoalbums.splice(indexOfAlbum, 1, album);

    if (album.isSelected) {
      let idx = selectedalbums.indexOf(album);
      selectedalbums.splice(idx, 1, album)
    }

    dispatch({
      type: PHOTOALBUM_DROPIMGSELECT,
      photoalbums: photoalbums,
      selectedalbums: selectedalbums,
      albumtoview: album
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
      photoalbums = state.photos.photoalbums,
      selectedalbums = state.photos.selectedalbums;


    function putAlbumToAlbums(items) {
      return new Promise((resolve, reject) => {
        if (!album.items) album.items = items;
        if (album.isSelected) {
          let idx = selectedalbums.indexOf(album);
          selectedalbums.splice(idx, 1, album);
        }
        photoalbums.splice(index, 1, album);
        setTimeout(() => {
          resolve (album);
        })
      });
    }



    Promise.resolve(album)
      .then((album) => {return getAlbumItems(album, access_token)})
      .then((items) => {
        if(items[0].src) {console.log("incache"); return(items)};
        return preparePhotosToView(items);
      })
      .then(putAlbumToAlbums)
      .then((album) => {
        console.log(album)
        dispatch({
          type: PHOTOALBUM_VIEW,
          photoalbums: photoalbums,
          selectedalbums: selectedalbums,
          albumtoview: album
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

export function delAlbums() {
  return function(dispatch, getState){
    console.log("delAlbums")
  }
}


/////////////////////////SAVING//////////////////////

export function saveSelectedAlbums() {
  return function(dispatch, getState) {
    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      selectedalbums = state.photos.selectedalbums;

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
    var album = state.photos.albumtoview;

    var imagestosave = [];




    album.items.forEach((item) => {
      if (item.isSelected) imagestosave.push(item.src)
    });

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
        console.log(items)
        items.forEach((item) => {
          console.log(item)
          imagestosave.push(item.src);
        })
        console.log(imagestosave)
        console.log(album.title)
        resolve(downloadAsZip(imagestosave, album.title, dispatch))
      })
      .catch((err) => {
        err = JSON.stringify(err);
        return dispatch({
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

    var album_id;
    switch(album.id) {
      case -6: {album_id = "profile"; break;}
      case -7: {album_id = "wall"; break;}
      case -15: {album_id = "saved"; break;}
      default: album_id = album.id;
    };

    var requestLink = linkCreator("execute.getAlbum", access_token, {album_id: album_id});

    jsonpRequest(requestLink)
      .then((response) => {
        resolve(response.items);
        })
      .catch((err) => {throw(err)});

  })
}

function getAlbumItems(album, access_token) {
  return new Promise ((resolve, reject) => {
      if (album.items) {
        console.log("Итемсы есть", album)
        resolve(album.items);
      }
      resolve(getAlbum(album, access_token))
 })
}

function preparePhotosToView(items) {
  return new Promise((resolve, reject) => {
    imagearrPrepare(items).then(resolve).catch((err) => {throw(err)})
  })
}
