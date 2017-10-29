import jsonpRequest from '../Utils/jsonpRequest';
import linkCreator from '../Utils/linkCreator';

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
      throw e;
    }
    targetarr = targetarr.concat(response.items);
    requestparams.offset += response.items.length;
    stopvalue = response.count;
    if (typeof onUpdate === "function") {
      onUpdate(Math.floor(targetarr.length/stopvalue*100));
    }
  }
  return targetarr;
}


export async function deleteWithExecute(items, type, access_token) {

}

export function findApiMethod(type) {
  switch (type) {
    case "photo":
      return;

    default:
      return new Error("Апи метод не найдет. Неверный тип");

  }
}
