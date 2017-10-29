export function apiPhotoDel(id) {
  return (
      "API.photos.delete({photo_id:" + id +"});"
  )
}

export function apiUnTag(owner_id, photo_id, user_id) {
  let tag = 'var tagarr=API.photos.getTags({owner_id:' + owner_id + ', photo_id:' + photo_id + '});'
  let filtertag = 'var tag_id;var tag;while(tagarr.length){tag = tagarr.pop(); if(tag.user_id == parseInt(' + user_id + ')) {tag_id=tag.id;};}; '
  let untag = 'API.photos.removeTag({owner_id:' + owner_id + ',photo_id:' + photo_id + ',tag_id: (tag_id)});'
  return (tag + filtertag + untag);
}

export function getFavePhotos(offset) {


///я конечно дико извиняюсь, но контакценцию (+) ВК ексекьют ни хера не поддерживает
  let newcode = `
var offset=${offset};
var count;
var resp1, resp2, resp3, resp4, resp5;

count = API.fave.getPhotos({"count": 1, "offset": 0}).count;
resp1 = API.fave.getPhotos({"count": 250, "offset": ${offset}, "photo_sizes": 1}).items;
resp2 = API.fave.getPhotos({"count": 250, "offset": ${offset + 250}, "photo_sizes": 1}).items;
resp3 = API.fave.getPhotos({"count": 250, "offset": ${offset + 500}, "photo_sizes": 1}).items;
resp4 = API.fave.getPhotos({"count": 250, "offset": ${offset + 750}, "photo_sizes": 1}).items;
resp5 = API.fave.getPhotos({"count": 250, "offset": ${offset + 1000}, "photo_sizes": 1}).items;

return {count: count, resp1: resp1, resp2: resp2, resp3: resp3, resp4: resp4, resp5: resp5};
  `
  return newcode;
}

export function apiUnLike(type, owner_id, item_id) {
  return `
    API.likes.delete({"type": ${type}, "owner_id": ${owner_id}, "item_id": ${item_id}});
  `;
}
