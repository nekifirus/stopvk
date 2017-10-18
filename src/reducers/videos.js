import {
  VIDEOS_REQUEST,
  VIDEOS_SUCCESS,
  VIDEOS_FAIL,

  VIDEOS_SELECT,
  VIDEOS_SELECTALL,

  VIDEOSDEL_REQUEST,
  VIDEOSDEL_SUCCESS,
  VIDEOSDEL_FAIL,

  VIDEO_SHOW,
  VIDEO_CLOSE

} from '../constants/Videos';


const initialState = {
  videosarr: [],
  videoslength: '',

  video: '',
  showvideo: false,

  fetching: false,
  fetchmessage: '',
  completemess: '',

  error: ''
}

export default function videos(state = initialState, action) {
  switch (action.type) {
    case VIDEOS_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Получаю список видеозаписей',
              videoslength: action.payload };
    case VIDEOS_SUCCESS:
      return {...state, error: '', fetching: false, videosarr: action.payload,
              videoslength: action.payload.length };
    case VIDEOS_FAIL:
      return {...state, fetching: false, error: action.payload };


    case VIDEOS_SELECT:
      return {...state, videosarr: action.payload };

    case VIDEOS_SELECTALL:
      return {...state, videosarr: action.payload };


    case VIDEOSDEL_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Удаляю видеозаписи',
              moteslength: action.payload };

    case VIDEOSDEL_SUCCESS:
      return {...state, fetchin: false, completemess: 'Удалил видозаписи'};

    case VIDEOSDEL_FAIL:
      return {...state, fetching: false, error: action.payload };


    case VIDEO_SHOW:
      return {...state, showvideo: true, video: action.payload };

    case VIDEO_CLOSE:
      return {...state, showvideo: false, video: '' };

    default:
      return state;

  }
}
