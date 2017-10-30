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
  friendsselected: 0,

  fetching: false,
  fetchmessage: '',
  completemess: '',

  error: ''
}


export default function friends(state = initialState, action) {
  switch (action.type) {
    case FRIENDS_REQUEST:
      return {...state, fetching: true, fetchmessage: "Получаю список друзей"};

    case FRIENDS_SUCCESS:
      return {...state, fetching: false, friendsarr: action.payload };

    case FRIENDS_FAIL:
      return {...state, fetching: false, error: action.payload };


    case FRIENDSDEL_REQUEST:
      return {...state, fetching: true, fetchmessage: "Очищаю список друзей" };

    case FRIENDSDEL_SUCCESS:
      return {...state, fetching: false, friendsarr: action.payload };

    case FRIENDSDEL_FAIL:
      return {...state, fetching: false, error: action.payload };

    case FRIENDS_SELECT:
      return {...state, friendsarr: action.payload, friendsselected: action.friendsselected };

    case FRIENDS_SELECTALL:
      return {...state, friendsarr: action.payload, friendsselected: action.friendsselected };


    default:
      return {...state}

  }
}
