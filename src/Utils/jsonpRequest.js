import jsonp from 'jsonp';

export default function jsonpRequest(requestLink) {
  return new Promise(function(resolve, reject) {
    jsonp(requestLink, function(err, data) {
      if (err) { console.log("in jsonpRequest", err); reject (err)};

      if (data.error) { console.log("in jsonpRequest", data.error); reject (data.error)};
      if (data.execute_errors) { console.log("in jsonpRequest", data.execute_errors); reject (data.execute_errors)};
      if (data.response) resolve (data.response);

    })
  });
};
