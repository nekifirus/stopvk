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
  FAVUSERDEL_FAIL

} from '../constants/Favs';

const initialState = {
  linkarr: [],
  linklength: '',

  userarr: [],
  userlength: '',

  fetching: false,
  fetchmessage: '',
  completemess: '',
  error: ''
}

export default function favs(state = initialState, action) {

  switch(action.type) {
    //ссылки из избранного
    case FAVLINKS_REQUEST:
      return {...state,
              linklength: action.payload,
              fetching: true,
              fetchmessage: "Получаю список ссылок из ВК",
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
              fetchmessage: "Удаляю ссылки из избранного"
      };

    case FAVLINKSDEL_SUCCESS:
      return {...state,
              fetching: false,
              completemess: "В избранном больше нет ссылок"
      };

    case FAVLINKSDEL_FAIL:
      return {...state, fetching: false, error: action.payload};

    //пользователи из избранного
    case FAVUSER_REQUEST:
      return {...state,
              userlength: action.payload,
              fetching: true,
              fetchmessage: "Получаю список пользователей в избранном",
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
              fetchmessage: "Удаляю пользователей из избранного"
      };

    case FAVUSERDEL_SUCCESS:
      return {...state,
              fetching: false,
              completemess: "В избранном больше нет пользователей"
      };

    case FAVUSERDEL_FAIL:
      return {...state, fetching: false, error: action.payload};






    default:
      return state
  }
}
