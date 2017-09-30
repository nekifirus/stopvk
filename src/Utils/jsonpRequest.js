import jsonp from 'jsonp';

export default function jsonpRequest(requestLink) {
  return new Promise(function(resolve, reject) {
    jsonp(requestLink, function(err, data) {
      if (err) reject (err);
      if (data.response) resolve (data.response);
      if (data.error) reject (data.error);

    })
  });
};
