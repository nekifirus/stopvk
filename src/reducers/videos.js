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
  videoslength: 0,


  video: '',
  showvideo: false,

  fetching: false,
  fetchmessage: '',
  percent: '',
  completemess: '',

  error: ''
}

export default function videos(state = initialState, action) {
  switch (action.type) {
    case VIDEOS_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Получаю список видеозаписей', percent: action.payload };
    case VIDEOS_SUCCESS:
      return {...state, error: '', fetching: false, videosarr: action.payload };
    case VIDEOS_FAIL:
      return {...state, fetching: false, error: action.payload };


    case VIDEOS_SELECT:
      return {...state, videosarr: action.payload, videoslength: action.videoslength };

    case VIDEOS_SELECTALL:
      return {...state, videosarr: action.payload, videoslength: action.videoslength };


    case VIDEOSDEL_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Удаляю видеозаписи'};

    case VIDEOSDEL_SUCCESS:
      return {...state, fetching: false, videosarr: action.payload, videoslength: action.videoslength };

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
