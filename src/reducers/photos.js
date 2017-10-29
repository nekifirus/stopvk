import {
  PHOTOALBUMSGET_REQUEST,
  PHOTOALBUMSGET_SUCCESS,
  PHOTOALBUMSGET_FAIL,

  PHOTOALBUM_SELECT,
  PHOTOALBUMS_SELECTALL,
  PHOTOALBUMS_DROPSELECTION,

  PHOTOALBUM_SELECTIMG,
  PHOTOALBUM_SELECTALLIMGS,
  PHOTOALBUM_DROPIMGSELECT,

  PHOTOALBUM_VIEW,
  PHOTOALBUM_CLOSE,

  PHOTOALBUM_DELSTART,
  PHOTOALBUM_DELSTOP,
  PHOTOALBUM_DELPROGRESS,
  PHOTOALBUM_DELFAIL,



} from '../constants/Photos';


const initialState = {
  photoalbums: [],
  selectedalbums: 0,

  albumtoview: '',
  viewtrigger: false,

  fetching: false,
  fetchmessage: '',
  percent: '',
  error: ''
}

export default function photos(state = initialState, action) {

  switch(action.type) {

    case PHOTOALBUMSGET_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Получаю список альбомов'};

    case PHOTOALBUMSGET_SUCCESS:
      return {...state, fetching: false, photoalbums: action.payload };

    case PHOTOALBUMSGET_FAIL:
      return {...state, fetching: false, error: action.payload };

    //////////SELECT/////////
    case PHOTOALBUM_SELECT:
      return {...state, photoalbums: action.photoalbums, selectedalbums: action.selectedalbums };

    case PHOTOALBUMS_SELECTALL:
      return {...state, photoalbums: action.photoalbums, selectedalbums: action.selectedalbums };

    case PHOTOALBUMS_DROPSELECTION:
      return {...state, photoalbums: action.payload, selectedalbums: [] };


    case PHOTOALBUM_SELECTIMG:
      return {...state, photoalbums: action.photoalbums };

    case PHOTOALBUM_SELECTALLIMGS:
      return {...state, photoalbums: action.photoalbums };


    case PHOTOALBUM_DROPIMGSELECT:
      return {...state, photoalbums: action.photoalbums };

    /////////////VIEW/////////
    case PHOTOALBUM_VIEW:
      return {...state, photoalbums: action.photoalbums,
                        albumtoview: action.albumtoview,
                        viewtrigger: true
      };


    case PHOTOALBUM_CLOSE:
      return {...state, viewtrigger: false, albumtoview: ''};


    ////////DELETE/////

    case PHOTOALBUM_DELSTART:
      return {...state, fetching: true,
              fetchmessage: 'Удаляю фотографии',
             };

    case PHOTOALBUM_DELPROGRESS:
      return {...state, percent: action.payload };

    case PHOTOALBUM_DELSTOP:
      return {...state, fetching: false, percent: '',
        photoalbums: action.photoalbums,
        selectedalbums: action.selectedalbums
      };

    case PHOTOALBUM_DELFAIL:
      return {...state, fetching: false, percent: '', error: action.payload}






    default:
      return state;
  }
}
