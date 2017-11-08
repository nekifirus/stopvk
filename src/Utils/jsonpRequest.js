import jsonp from 'jsonp';


function request(url) {
  return new Promise(function(resolve, reject) {
    jsonp(url, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  });
}

export default async function jsonpRequest(url) {
  var resp;
  console.log(url)

  let key = sessionStorage.getItem("key");
  let sid = sessionStorage.getItem("sid");

  url = url + "&captcha_sid=" + sid + "&captcha_key=" +key;

  console.log(url)

  try {
    resp = await request(url);
  } catch (e) {
    throw new Error("Network error");
  }

  if (resp.error) {
    console.log(resp.error);
    throw (resp.error);
  } else if (resp.execute_errors) {
    console.log(resp.execute_errors);
    if (Array.isArray(resp.execute_errors)) {
      if (resp.execute_errors[0].error_code === 9) {
        try {
          setTimeout(function(){
            jsonpRequest(url);
          }, 888);
        } catch (e) {
          throw e;
        }
      }
    }
    if (resp.execute_errors.error_code === 9) {
      try {
        setTimeout(function(){
          jsonpRequest(url);
        }, 888);
      } catch (e) {
        throw e;
      }
    }
    throw (resp.execute_errors)
  }
  console.log(resp.response)
  return resp.response;

}
