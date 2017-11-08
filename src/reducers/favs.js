import {
  //ссылки избранное
  FAVLINKS_REQUEST,
  FAVLINKS_SUCCESS,
  FAVLINKS_FAIL,

  FAVLINKSDEL_REQUEST,
  FAVLINKSDEL_SUCCESS,
  FAVLINKSDEL_FAIL,
  //пользователи избранное
  FAVUSER_REQUEST,
  FAVUSER_SUCCESS,
  FAVUSER_FAIL,

  FAVUSERDEL_REQUEST,
  FAVUSERDEL_SUCCESS,
  FAVUSERDEL_FAIL,

  //fav video
  FAVVIDEO_REQUEST,
  FAVVIDEO_SUCCESS,
  FAVVIDEO_FAIL,

  FAVVIDEODEL_REQUEST,
  FAVVIDEODEL_SUCCESS,
  FAVVIDEODEL_FAIL,

  //fav posts
  FAVPOSTS_REQUEST,
  FAVPOSTS_SUCCESS,
  FAVPOSTS_FAIL,

  FAVPOSTSDEL_REQUEST,
  FAVPOSTSDEL_SUCCESS,
  FAVPOSTSDEL_FAIL,

  //fave markit
  FAVMARKIT_REQUEST,
  FAVMARKIT_SUCCESS,
  FAVMARKIT_FAIL,

  FAVMARKITDEL_REQUEST,
  FAVMARKITDEL_SUCCESS,
  FAVMARKITDEL_FAIL,

  

} from '../constants/Favs';

const initialState = {
  linkarr: [],

  userarr: [],

  videoarr: [],

  postsarr: [],

  markitarr: '',


  fetching: false,
  fetchmessage: '',
  percent: '',

  error: ''
}

export default function favs(state = initialState, action) {

  switch(action.type) {
    //ссылки из избранного
    case FAVLINKS_REQUEST:
      return {...state,
              percent: action.payload,
              fetching: true,
              fetchmessage: "Получаю список ссылок в закладках"
      };

    case FAVLINKS_SUCCESS:
      return {...state, fetching: false,
              linkarr: action.payload,
      };

    case FAVLINKS_FAIL:
      return {...state, error: action.payload, fetching: false };



    case FAVLINKSDEL_REQUEST:
      return {...state,
              linklength: action.payload,
              fetching: true,
              fetchmessage: "Удаляю ссылки из закладок"
      };

    case FAVLINKSDEL_SUCCESS:
      return {...state,
              fetching: false,
              linklength: 0,
              completemess: "В закладках больше нет ссылок"
      };

    case FAVLINKSDEL_FAIL:
      return {...state, fetching: false, error: action.payload};

    //пользователи из избранного
    case FAVUSER_REQUEST:
      return {...state,
              percent: action.payload,
              fetching: true,
              fetchmessage: "Получаю список пользователей в закладках"
      };

    case FAVUSER_SUCCESS:
      return {...state, fetching: false,
              userarr: action.payload
      };

    case FAVUSER_FAIL:
      return {...state, error: action.payload, fetching: false };



    case FAVUSERDEL_REQUEST:
      return {...state,
              percent: action.payload,
              fetching: true,
              fetchmessage: "Удаляю пользователей из закладок"
      };

    case FAVUSERDEL_SUCCESS:
      return {...state,
              fetching: false,
              userarr: action.payload
      };

    case FAVUSERDEL_FAIL:
      return {...state, fetching: false, error: action.payload};


    //видео в закладках

    case FAVVIDEO_REQUEST:
      return {...state,
              percent: action.payload,
              fetching: true,
              fetchmessage: "Получаю список видеозаписей в закладках"
      };

    case FAVVIDEO_SUCCESS:
      return {...state, fetching: false,
              videoarr: action.payload
      };

    case FAVVIDEO_FAIL:
      return {...state, error: action.payload, fetching: false };


    case FAVVIDEODEL_REQUEST:
      return {...state,
              percent: action.payload,
              fetching: true,
              fetchmessage: "Удаляю видеозаписи из закладок"
      };

    case FAVVIDEODEL_SUCCESS:
      return {...state,
              fetching: false,
              videoarr: action.payload
      };

    case FAVVIDEODEL_FAIL:
      return {...state, fetching: false, error: action.payload};



    // favs posts
    case FAVPOSTS_REQUEST:
        return {...state,
                percent: action.payload,
                fetching: true,
                fetchmessage: "Получаю список постов в закладках"
        };

      case FAVPOSTS_SUCCESS:
        return {...state, fetching: false,
                postsarr: action.payload
        };

      case FAVPOSTS_FAIL:
        return {...state, error: action.payload, fetching: false };


      case FAVPOSTSDEL_REQUEST:
        return {...state,
                percent: action.payload,
                fetching: true,
                fetchmessage: "Удаляю посты из закладок"
        };

      case FAVPOSTSDEL_SUCCESS:
        return {...state,
                fetching: false,
                postsarr: action.payload
        };

      case FAVPOSTSDEL_FAIL:
        return {...state, fetching: false, error: action.payload};




      //marketitem
      case FAVMARKIT_REQUEST:
        return {...state,
                percent: action.payload,
                fetching: true,
                fetchmessage: "Получаю список товаров в закладках",
        };

      case FAVMARKIT_SUCCESS:
        return {...state, fetching: false,
                markitarr: action.payload
        };

      case FAVMARKIT_FAIL:
        return {...state, error: action.payload, fetching: false };


      case FAVMARKITDEL_REQUEST:
        return {...state,
                percent: action.payload,
                fetching: true,
                fetchmessage: "Удаляю товары из закладок"
        };

      case FAVMARKITDEL_SUCCESS:
        return {...state,
                fetching: false,
                markitarr: action.payload,
                completemess: "В закладках больше нет товаров"
        };

      case FAVMARKITDEL_FAIL:
        return {...state, fetching: false, error: action.payload};


    default:
      return state
  }
}
