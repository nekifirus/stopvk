function bestImg(sizes, priority) {
  //функция берет массив sizes и находит объекты с нужным типом
  var resqueitem;
  priority = priority || ["w", "z", "y", "x", "m", "s"];
  console.log(sizes)
  for (var i=0; i<priority.length; i++) {
    for (var j=0;j<sizes.length; j++) {
      console.log("sizes[j]: ", sizes[j], "priority[i]: ", priority[i])
      if (sizes[j].type === priority[i]) {

        resqueitem = sizes[j];
        console.log(resqueitem)
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
    console.log(bigimg, thumb)
    newitem.src = bigimg.src;
    newitem.thumbnail = thumb.src;

    newitem.id = item.id;
    newitem.owner_id = item.owner_id;
    newitem.isSelected = item.isSelected;

    if (thumb.width && thumb.height) {
      newitem.thumbnailHeight = thumb.height;
      newitem.thumbnailWidth = thumb.width;
    } else {
      imgSize(thumb.src)
        .then(function(img) {
          newitem.thumbnailHeight = img.height;
          newitem.thumbnailWidth = img.width;
          console.log(img.width, img.height)
          resolve (newitem);
        });
    }

    resolve (newitem);
  })
}





export default function imagearrPrepare(arr) {
  return new Promise(function(resolve, reject) {
    var ArrayOfPromises = arr.map(function(item){
      return imagePrepare(item);
    });
    var newarr = Promise.all(ArrayOfPromises)
      .then(function(results){
        console.log(results)
        newarr = results;
        return newarr;
      })
      .catch((err) => console.log(err));
    console.log("before resolve", newarr)
    resolve (newarr);
  });
};
