export default function likesPrepare(arr, count) {
 var returnstring = [];
 arr = arr.splice(-count, count);

 for (var key of arr) {
     returnstring.push(key.id);
     returnstring.push(key.owner_id);
  };

 returnstring = returnstring.join();
 return returnstring;
};
