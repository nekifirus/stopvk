import {
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,

  MESSAGEDEL_REQUEST,
  MESSAGEDEL_SUCCESS,
  MESSAGEDEL_FAIL
} from '../constants/Messages';


const initialState = {
  dialogsarr: [],
  percent: '',

  fetching: false,
  fetchmessage: '',

  error: ''
}

export default function mess(state = initialState, action) {

  switch(action.type) {
    case MESSAGE_REQUEST:
      return {...state,
              fetching: true, fetchmessage: action.message,
              percent: action.payload
      };
    case MESSAGE_SUCCESS:
      return {...state,
              fetching: false,
              dialogsarr: action.payload
      };
    case MESSAGE_FAIL:
      return {...state, fetching: false, error: action.payload };


    case MESSAGEDEL_REQUEST:
      return {...state, fetching: true,
              fetchmessage: 'Удаляю личные сообщения',
              messageslength: action.payload
      };
    case MESSAGEDEL_SUCCESS:
      return {...state, fetching: false, completemess: 'Личные сообщения удалены'};
    case MESSAGEDEL_FAIL:
      return {...state, fetching: false, error: action.payload };

    default:
      return state;
  }
};
