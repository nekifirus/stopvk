

export function delAlbums() {
  return function(dispatch, getState) {
    console.log("delAlbums")
    const
      state = getState(),
      access_token = state.auth.access_token;
    var
      photoalbums = state.photos.photoalbums,
      selectedalbums = state.photos.selectedalbums,
      albumtoview = state.photos.albumtoview;

    startDelete(dispatch)
      .then(() => {
        selectedalbums.reduce((prev, curr, index, arr) => {
          return prev.then(()=> {
            progressDelete(dispatch, arr, index)
            return delAlbum(curr, access_token, dispatch);
          })
          .catch((err) => {throw new Error(err)})
        }, Promise.resolve())
      })
      .then(() => stopDelete(dispatch))
      .then(() => {
        console.log(photoalbums)
        photoalbums = getSelected(photoalbums, false);
        console.log(photoalbums)
        if (albumtoview.isSelected) albumtoview = '';
        dispatch({
          type: PHOTOALBUM_DELSUCCESS,
          photoalbums: photoalbums,
          selectedalbums: [],
          albumtoview: albumtoview
        })
      })
      .catch((err) => {
        err = JSON.stringify(err);
        dispatch({
          type: PHOTOALBUM_DELFAIL,
          payload: err
        });
        stopDelete(dispatch)
      })
  }
}

function delAlbum(album, access_token, dispatch) {
  return new Promise(function(resolve, reject) {

    function AlbumDelReq() {
      return new Promise(function(resolve, reject) {
        let requestLink = linkCreator("photos.deleteAlbum", access_token,
                                      {album_id: getAlbumID(album.id)});
        delay(333, requestLink)
          .then(jsonpRequest)
          .then(resolve)
          .catch(reject)
      });
    }

    getAlbumItems(album, access_token)
      .then((items) => {
        if (items) return delPhotosInAlbum(album.items, dispatch, access_token)
        return;
      })
      .then(AlbumDelReq)
      .then(resolve)
      .catch(reject)

  });
}


export function delSelectedInAlbum(){
  return function (dispatch, getState) {


    const
      state = getState(),
      access_token = state.auth.access_token;

    var
      albumtoview = state.photos.albumtoview,
      selectedalbums = state.photos.selectedalbums,
      photoalbums = state.photos.photoalbums;

    var
      imagestoDelete = getSelected(albumtoview.items, true),
      savedimages = getSelected(albumtoview.items, false);


    delPhotosInAlbum(imagestoDelete, dispatch, access_token)
      .then(() => {
        albumtoview.items = savedimages;
        if (albumtoview.isSelected) {
          let idx = selectedalbums.indexOf(albumtoview);
          selectedalbums.splice(idx, 1, albumtoview);
        }
        let index = photoalbums.indexOf(albumtoview);
        photoalbums.splice(index, 1, albumtoview);
        dispatch({
          type: PHOTOALBUM_DELSUCCESS,
          photoalbums: photoalbums,
          selectedalbums: selectedalbums,
          albumtoview: albumtoview
        })

      })
      .catch((err) => {
          if (err.items) {
            albumtoview.items = savedimages.concat(err.items);

            if (albumtoview.isSelected) {
              let idx = selectedalbums.indexOf(albumtoview);
              selectedalbums.splice(idx, 1, albumtoview);
            }

            let index = photoalbums.indexOf(albumtoview);
            photoalbums.splice(index, 1, albumtoview);

            dispatch({
              type: PHOTOALBUM_DELSUCCESS,
              photoalbums: photoalbums,
              selectedalbums: selectedalbums,
              albumtoview: albumtoview
            });
          }
          err = JSON.stringify(err);
          dispatch({
            type: PHOTOALBUM_DELFAIL,
            payload: err
          })

      })
  }
}



function delPhotosInAlbum(images, dispatch, access_token) {
  return new Promise(function(resolve, reject) {

    function makeDeleteLink(arr) {
      return new Promise((resolve) => {
        resolve(linkCreator(methodname, access_token, {photo_ids: arr.join()}) )
      });
    };

    function makeArrayOfId(array) {
      return new Promise(function(resolve) {
        resolve(array.map(item => item.id));
      });
    };

    function makedelReqIteration(items) {
      return new Promise(function(resolve, reject) {
        console.log(items)
        if (!items) resolve();
        let todel = items.splice(-count);
        delay(333, todel)
          .then(makeArrayOfId)
          .then(makeDeleteLink)
          .then(jsonpRequest)
          .then(() =>resolve(items))
          .catch((err) => {
            items = items.concat(todel);
            reject({err, items})
          })
      });
    };

    function delRequestSeq(items, count) {
      return new Promise(function(resolve, reject) {

        let seqlength = Math.floor(items.length/count) + 1;
        let seqarr = [];
        for (let i = 0; i < seqlength; i++) seqarr.push(1);
        console.log(seqarr)


        seqarr.reduce((prev, current, index, arr) => {
          return prev.then((items) => {
            progressDelete(dispatch, arr, index);
            return makedelReqIteration(items)
          })
          .catch(reject)
        }, Promise.resolve(items))
        .then(resolve)
        .catch(reject)
      });
    }


    const
      methodname = "execute.delPhotos",
      count = 2;

    startDelete(dispatch)
      .then(() => {return delRequestSeq(images, count)})
      .then(()=> stopDelete(dispatch))
      .then(resolve)
      .catch(reject)

{/*
    var requestLinkarray = [];

    while(images.length) {
      let todelete = images.splice(0, count).join();

      let link = linkCreator(methodname, access_token,
          {photo_ids: todelete})
      requestLinkarray.push(link);
    }

    requestLinkarray.reduce((prev, current, index, arr) => {
      return prev.then(() => {
        dispatch({
          type: PHOTOALBUM_DELPROGRESS,
          payload: getPercent(arr.length, index)
        });
        setTimeout(() => {
          return jsonpRequest(current)
        }, 333);
      })
    }, startDelete())
    .then(stopDelete)
    .then(resolve)
    .catch(reject)
*/}
  });
}









function makedelReq(items, access_token) {
  return new Promise(function(resolve, reject) {

    const
      methodname = "execute.delPhotos",
      count = 2;

    if (!Array.isArray(items)) reject(new Error("Для удаления нужен массив"));
    if (!items.length) resolve()

    delay(333, items)
      .then(makeArrayOfId)
      .then(makeDeleteLink)
      .then(jsonpRequest)
      .then(resolve)
      .catch(reject)


    function makeDeleteLink(arr) {
      return new Promise((resolve) => {
        resolve(linkCreator(methodname, access_token, {photo_ids: arr.join()}) )
      });
    };

    function makeArrayOfId(array) {
      return new Promise(function(resolve) {
        resolve(array.map(item => item.id));
      });
    };

  });
};


function* deleteSequence(items, count, access_token) {
  while (items.length) {
    yield makedelReq(items.splice(-count), access_token)
  }
}

const process = function(generator) {
  var next = generator.next;

  if(!next.done) next.value
    .then(() => process(generator))
    .catch((err) throw new Error(err))

}



async function deleteRequest(items, access_token) {
  const
    count = 2,
    methodname = "execute.delPhotos";

  while(items.length) {
    let todel = items.splice(-count);
    todel = items.map(item => item.id);
    let url = linkCreator(methodname, access_token, {photo_ids: todel.join()})
    await jsonpRequest(url);
  }
}

async function getwithOffset(access_token, methodname, linkparams, targetarr) {
  var stopvalue = 1;

  while(offset < stopvalue) {
    let url = linkCreator(methodname, access_token, linkparams);
    try {
      let response = await jsonpRequest(url);
    } catch (e) {
      throw e;
    }
    targetarr = targetarr.concat(response.items);
    linkparams.offset += response.items.length;
  }

  return targetarr;
}





function sequence(items, cb) {
  return items.reduce(function(promise, item) {
    return promise.then(function() {
      return cb.call(this, item);
    });
  }, Promise.resolve());
}


function groupArrayForCount(arr, count) {
  var newarr = [];
  while(arr.length) newarr.push (arr.splice(-count))
  return newarr;
}
