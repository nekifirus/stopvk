import FileSaver from 'file-saver';
import JSZip from 'jszip';


import {

  DL_PROGRESS,
  DL_FAIL
} from '../constants/Downloader';



function downloadBlob(url) {
  return new Promise(function(resolve, reject) {

    try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://cors-anywhere.herokuapp.com/" +url);
            xhr.responseType = "blob";
            xhr.onerror = function() {reject("Network error.")};
            xhr.onload = function() {
                if (xhr.status === 200) {resolve(xhr.response)}
                else {reject("Loading error:" + xhr.statusText)}
            };
            xhr.send();
        }
        catch(err) {reject(err.message)}
  });
}





export default function downloadAsZip(images, title, dispatch) {
  return new Promise(function(resolve, reject) {
    function dispatchSavingProgress(metadata) {
      dispatch({
        type: DL_PROGRESS,
        percent: metadata.percent.toFixed(),
        file: metadata.currentFile
      });
    }

    
    var zip = new JSZip();

    var ArrayofBlobsPromisess = images.map(downloadBlob);

    ArrayofBlobsPromisess.forEach((item, index) => {
      zip.folder(title).file(index + 1 + ".jpg", item)
    })

    console.log(zip)


    zip.generateAsync({type: "blob"}, dispatchSavingProgress)
      .then((resp) => {
        resolve(FileSaver.saveAs(resp, title + ".zip"))

      })
      .catch((err) => {
        err = JSON.stringify(err);
        dispatch({
          type: DL_FAIL,
          payload: err
        });
        reject(err)
      })
  });

};
