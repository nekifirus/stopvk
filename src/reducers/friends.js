import {
  FRIENDS_REQUEST,
  FRIENDS_SUCCESS,
  FRIENDS_FAIL,

  FRIENDS_SELECT,
  FRIENDS_SELECTALL,

  FRIENDSDEL_REQUEST,
  FRIENDSDEL_SUCCESS,
  FRIENDSDEL_FAIL,

} from '../constants/Friends';


const initialState = {
  friendsarr: [],
  friendslength: '',

  fetching: false,
  fetchmessage: '',
  completemess: '',

  error: ''
}


export default function friends(state = initialState, action) {
  switch (action.type) {
    case FRIENDS_REQUEST:
      return {...state, fetching: true, fetchmessage: "Получаю список друзей",
              friendslength: action.payload };

    case FRIENDS_SUCCESS:
      return {...state, fetching: false, friendsarr: action.payload,
              friendslength: action.payload.length };

    case FRIENDS_FAIL:
      return {...state, fetching: false, error: action.payload };


    case FRIENDSDEL_REQUEST:
      return {...state, fetching: true, fetchmessage: "Очищаю список друзей",
              friendslength: action.payload };

    case FRIENDSDEL_SUCCESS:
      return {...state, fetching: false, completemess: "Список друзей очищен" };

    case FRIENDSDEL_FAIL:
      return {...state, fetching: false, error: action.payload };

    case FRIENDS_SELECT:
      return {...state, friendsarr: action.payload };

    case FRIENDS_SELECTALL:
      return {...state, friendsarr: action.payload };


    default:
      return {...state}

  }
}
