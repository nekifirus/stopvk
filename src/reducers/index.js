import { combineReducers } from 'redux';
import auth from './auth';
import wall from './wall';
import favs from './favs';
import mess from './mess';
import groups from './groups';
import friends from './friends';
import notes from './notes';
import docs from './docs';
import videos from './videos';
import photos from './photos';
import downloader from './downloader';

export default combineReducers({
  auth,
  wall,
  favs,
  mess,
  groups,
  friends,
  notes,
  docs,
  videos,
  photos,
  downloader
})
