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
    API.likes.delete({"type": "${type}", "owner_id": ${owner_id}, "item_id": ${item_id}});
  `;
}

export function apiFaveDelLink(link) {
  return `
    API.fave.removeLink({"link_id": ${link.id}});
  `
}

export function apiFaveDelUser(user) {
  return `API.fave.removeUser({"user_id": ${user.id}})`
}

export function apiUnFriend(friend) {
  return `
    API.friends.delete({"user_id":${friend.id}});
  `
}

export function apiDelVideo(video) {
  return `
    API.video.delete({"video_id": ${video.id}});
  `
}

export function apiDelDocs(doc) {
  return `
    API.docs.delete({"owner_id": ${doc.owner_id}, "doc_id": ${doc.id}});
  `
}

export function apiLeaveGroups(group) {
  return `
    API.groups.leave({"group_id": ${group.id}});
  `
}

export function apiDelNotes(note) {
  return `
    API.notes.delete({"note_id": ${note.id}});
  `
}


export function apiDelPosts(id) {
  return `
    API.wall.delete({"post_id": ${id}});
  `
}


export function apiDelMessages(dialog) {
  let code;
  if (dialog.id > 2000000000) {
    code = `
      API.messages.removeChatUser({"chat_id": ${dialog.id - 2000000000}, "user_id":${dialog.user_id}});
      API.messages.deleteDialog({"peer_id": ${dialog.id}});
    `
  } else {
    code = `API.messages.deleteDialog({"user_id": ${dialog.id}});`
  }
  return code;
}
