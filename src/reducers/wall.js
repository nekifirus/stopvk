import {
  WALLINDEX_REQUEST,
  WALLINDEX_SUCCESS,
  WALLINDEX_FAIL,
  WALLDELL_START,
  WALLDELL_STOP,
  WALLDELL_WORK,
  WALLDELL_SUCCESS,
  WALLDELL_ERROR
} from '../constants/Wall'


const initialState = {
  percent: 0,
  posts: '',
  //что касается момента загрузки
  fetching: false,
  fetchmessage: '',
  //остановка удаления
  trigger: '',
  //когда все закончилось
  error: ''
};


export default function wall(state=initialState, action) {
  switch (action.type) {

    //обработка запросов из БД ВК
    case WALLINDEX_REQUEST:
      return { ...state,
        fetching: true,
        percent: action.payload };

    case WALLINDEX_FAIL:
      return { ...state, error: action.payload, fetching: false };

    case WALLINDEX_SUCCESS:
      return { ...state,
        posts: action.payload,
        fetching: false
      };


    //удаление постов
    case WALLDELL_START:
      return { ...state,
        trigger: true,
        fetching: true,
        fetchmessage: "Удаляю посты со стены"
      };
    case WALLDELL_WORK:
      return { ...state, percent: action.payload };
    case WALLDELL_STOP:
      return { ...state, trigger: false, fetching: false };
    case WALLDELL_SUCCESS:
      return { ...state, trigger: false, fetching: false,
        posts: action.payload
      };
    case WALLDELL_ERROR:
      return { ...state, fetching: false, trigger: false,
        error: action.payload
      };

    default:
        return state
  }
};
