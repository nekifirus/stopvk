
export default function linkCreator(methodname, access_token, params) {
  var link;
  var paramstext = "";
  for (var par in params) {
    paramstext = paramstext + par + "=" + params[par] + "&";
  };
  link = "https://api.vk.com/method/" +
    methodname + "?" +
    "access_token=" + access_token + "&" +
    paramstext +
    "v=5.68";
  return link;
}



export function executeLinkCreator(codearr, access_token) {
  let code = codearr.join(' ') + 'return "1";'
  return (
    linkCreator("execute", access_token, {code: code})
  )
}
