export function bestImg(sizes, priority) {
  //функция берет массив sizes и находит объекты с нужным типом
  var resqueitem;
  priority = priority || ["w", "z", "y", "x", "m", "s"];

  for (var i=0; i<priority.length; i++) {
    for (var j=0;j<sizes.length; j++) {
      if (sizes[j].type === priority[i]) {

        resqueitem = sizes[j];
        break;
      };
    };

    if (resqueitem) break;
  };

  return resqueitem;
};



function imgSize(src) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function(){
      resolve (img);
    }
    img.src = src;
  });
};





function imagePrepare(item) {
  return new Promise(function(resolve, reject) {
    var newitem = {};

    var
      bigimg = bestImg(item.sizes),
      thumb = bestImg(item.sizes, ["x", "m", "s", "y", "z", "w"]);

    newitem.src = bigimg.src;
    newitem.thumbnail = thumb.src;

    newitem.id = item.id;
    newitem.owner_id = item.owner_id;
    newitem.album_id = item.album_id;
    newitem.date = item.date;
    newitem.liled = item.liked;
    newitem.tagget = item.tagget;
    newitem.user_id = item.user_id;
    newitem.size = item.size;
    newitem.isSelected = item.isSelected;

    if (thumb.width && thumb.height) {
      newitem.thumbnailHeight = thumb.height;
      newitem.thumbnailWidth = thumb.width;
    } else {
      imgSize(thumb.src)
        .then(img => {
          newitem.thumbnailHeight = img.height;
          newitem.thumbnailWidth = img.width;
        })
    }


    resolve (newitem);
  })
}





export function imagearrPrepareBack(arr) {
  return new Promise(function(resolve, reject) {
    var ArrayOfPromises = arr.map(imagePrepare);

    var newarr = Promise.all(ArrayOfPromises)
      .then(function(results){

        return results;
      })
      .catch((err) => console.log(err));

    resolve (newarr);
  });
};


export default async function imagearrPrepare(arr) {


  var newarr = [];

  while(arr.length) {
    let item = arr.pop();
    item = await imagePrepare(item);
    newarr.push(item);
  }

  return newarr;

};
