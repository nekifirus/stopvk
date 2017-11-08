

var storage = localStorage;


export function setData(data) {
  for (var name in data) {
    let value = (data[name]);
    console.log(name, value)
    storage.setItem(name, value);
  }
}

export function getToken() {
  let token = storage.getItem("access_token");

  return token;
}

export function getUserId() {
  let token = storage.getItem("user_id");

  return token;
}

export function removeAuth() {
  storage.removeItem("user_id")
  storage.removeItem("access_token")
}
