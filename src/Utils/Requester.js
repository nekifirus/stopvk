import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator, {executeLinkCreator} from '../Utils/linkCreator';

export function delay(ms){
  return new Promise(function(resolve) {
    setTimeout(()=>{resolve()}, ms)
  });
}

export async function getwithOffset(params, onUpdate) {
  var stopvalue = 1, response;
  var {access_token, methodname, targetarr, requestparams} = params;

  while(requestparams.offset < stopvalue) {
    let url = linkCreator(methodname, access_token, requestparams);
    try {
      response = await delay(333).then(()=>jsonpRequest(url))
      console.log(response)
    } catch (e) {
      console.log(e)
      throw e;
    }

    targetarr = targetarr.concat(response.items);
    requestparams.offset += response.items.length;
    stopvalue = response.count;

    //из-за fave.getPosts который не отдает до конца посты
    if(response.items.length === 0) stopvalue = requestparams.offset;

    if (typeof onUpdate === "function") {
      onUpdate(Math.floor(targetarr.length/stopvalue*100));
    }
  }

  return targetarr;
}

export async function deleteWithExecute(items, access_token, getApi, onUpdate) {
  const count = 10, initiallength = items.length;
  var deleted = [];

  while(items.length) {
    let todel = items.splice(-count);
    console.log(todel)
    let url = executeLinkCreator(
      todel.map(item => getApi(item)),
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
    deleted = deleted.concat(todel);
    if (typeof onUpdate === "function") {
      onUpdate(Math.floor(100 - items.length/initiallength*100));
    }
  }

  return deleted;
}
