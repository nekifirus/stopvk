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
    throw (resp.execute_errors)
  }
  console.log(resp.response)
  return resp.response;

}
