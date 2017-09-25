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

  //favs photo
  FAVPHOTO_REQUEST,
  FAVPHOTO_SUCCESS,
  FAVPHOTO_FAIL,

  FAVPHOTODEL_REQUEST,
  FAVPHOTODEL_SUCCESS,
  FAVPHOTODEL_FAIL,

  //captcha

  CAPTCHA_NEEDED,
  CAPTCHA_SET,
  CAPTCHA_CANCEL,
  CAPTCHA_SUBMITED

} from '../constants/Favs';

const initialState = {
  linkarr: [],
  linklength: '',

  userarr: [],
  userlength: '',

  videoarr: [],
  videolength: '',

  postsarr: [],
  postslength: '',

  markitarr: '',
  markitlength: '',

  photoarr: '',
  photolength: '',

  fetching: false,
  fetchmessage: '',
  completemess: '',

  captcha_img: '',
  captcha_sid: '',
  captcha_key: '',
  captcha_params: '',

  error: ''
}

export default function favs(state = initialState, action) {

  switch(action.type) {
    //ссылки из избранного
    case FAVLINKS_REQUEST:
      return {...state,
              linklength: action.payload,
              fetching: true,
              fetchmessage: "Получаю список ссылок в закладках",
              completemess: '',
              error: ''
      };

    case FAVLINKS_SUCCESS:
      return {...state, fetching: false,
              linkarr: action.payload,
              linklength: action.payload.length };

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
              userlength: action.payload,
              fetching: true,
              fetchmessage: "Получаю список пользователей в закладках",
              completemess: '',
              error: ''
      };

    case FAVUSER_SUCCESS:
      return {...state, fetching: false,
              userarr: action.payload,
              userlength: action.payload.length };

    case FAVUSER_FAIL:
      return {...state, error: action.payload, fetching: false };

    case FAVUSERDEL_REQUEST:
      return {...state,
              userlength: action.payload,
              fetching: true,
              fetchmessage: "Удаляю пользователей из закладок"
      };

    case FAVUSERDEL_SUCCESS:
      return {...state,
              fetching: false,
              userlength: 0,
              completemess: "В закладках больше нет пользователей"
      };

    case FAVUSERDEL_FAIL:
      return {...state, fetching: false, error: action.payload};


    //видео в закладках

    case FAVVIDEO_REQUEST:
      return {...state,
              videolength: action.payload,
              fetching: true,
              fetchmessage: "Получаю список видеозаписей в закладках",
              completemess: '',
              error: ''
      };

    case FAVVIDEO_SUCCESS:
      return {...state, fetching: false,
              videoarr: action.payload,
              videolength: action.payload.length };

    case FAVVIDEO_FAIL:
      return {...state, error: action.payload, fetching: false };

    case FAVVIDEODEL_REQUEST:
      return {...state,
              videolength: action.payload,
              fetching: true,
              fetchmessage: "Удаляю видеозаписи из закладок"
      };

    case FAVVIDEODEL_SUCCESS:
      return {...state,
              fetching: false,
              videolength: 0,
              completemess: "В закладках больше нет видеозаписей"
      };

    case FAVVIDEODEL_FAIL:
      return {...state, fetching: false, error: action.payload};



    // favs posts
    case FAVPOSTS_REQUEST:
        return {...state,
                postslength: action.payload,
                fetching: true,
                fetchmessage: "Получаю список постов в закладках",
                completemess: '',
                error: ''
        };

      case FAVPOSTS_SUCCESS:
        return {...state, fetching: false,
                postsarr: action.payload,
                postslength: action.payload.length };

      case FAVPOSTS_FAIL:
        return {...state, error: action.payload, fetching: false };

      case FAVPOSTSDEL_REQUEST:
        return {...state,
                postslength: action.payload,
                fetching: true,
                fetchmessage: "Удаляю посты из закладок"
        };

      case FAVPOSTSDEL_SUCCESS:
        return {...state,
                fetching: false,
                postslength: 0,
                completemess: "В закладках больше нет постов"
        };

      case FAVPOSTSDEL_FAIL:
        return {...state, fetching: false, error: action.payload};




      //marketitem
      case FAVMARKIT_REQUEST:
        return {...state,
                markitlength: action.payload,
                fetching: true,
                fetchmessage: "Получаю список товаров в закладках",
                completemess: '',
                error: ''
        };

      case FAVMARKIT_SUCCESS:
        return {...state, fetching: false,
                markitarr: action.payload,
                markitlength: action.payload.length };

      case FAVMARKIT_FAIL:
        return {...state, error: action.payload, fetching: false };

      case FAVMARKITDEL_REQUEST:
        return {...state,
                markitlength: action.payload,
                fetching: true,
                fetchmessage: "Удаляю товары из закладок"
      };

      case FAVMARKITDEL_SUCCESS:
        return {...state,
                fetching: false,
                markitlength: 0,
                completemess: "В закладках больше нет товаров"
        };

      case FAVMARKITDEL_FAIL:
        return {...state, fetching: false, error: action.payload};


      //photo
      case FAVPHOTO_REQUEST:
        return {...state,
                photolength: action.payload,
                fetching: true,
                fetchmessage: "Получаю список фотографий в закладках",
                completemess: '',
                error: ''
        };

      case FAVPHOTO_SUCCESS:
        return {...state, fetching: false,
                photoarr: action.payload,
                photolength: action.payload.length };

      case FAVPHOTO_FAIL:
        return {...state, error: action.payload, fetching: false };

      case FAVPHOTODEL_REQUEST:
        return {...state,
                photolength: action.payload,
                fetching: true,
                fetchmessage: "Удаляю фотографии из закладок"
      };

      case FAVPHOTODEL_SUCCESS:
        return {...state,
                fetching: false,
                photolength: 0,
                completemess: "В закладках больше нет фотографий"
        };

      case FAVPHOTODEL_FAIL:
        return {...state, fetching: false, error: action.payload};






      //captcha
      case CAPTCHA_NEEDED:
        return {...state,
                captcha_img: action.img,
                captcha_sid: action.sid,
                captcha_params: action.params
        };

      case CAPTCHA_SET:
        return {...state, captcha_key: action.payload };

      case CAPTCHA_CANCEL:
        return {...state,
                captcha_key: '',
                captcha_img: '',
                captcha_sid: '',
                captcha_params: '',
                fetching: false
        };

      case CAPTCHA_SUBMITED:
        return {...state,
                captcha_img: '',
                captcha_sid: '',
                captcha_key: '',
                captcha_params: ''
        };




    default:
      return state
  }
}
