import crypt from 'crypt-js';

var storage = localStorage;


export function setData(data) {
  for (var name in data) {
    let value = (data[name]);
    value = crypt.crypt(value, "stopvk");
    storage.setItem(name, value);
  }
}

export function getToken() {
  let token = storage.getItem("access_token");
  token = crypt.dectypt(token, "stopvk");
  return token;
}
