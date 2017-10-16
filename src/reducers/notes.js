import {
  NOTES_REQUEST,
  NOTES_SUCCESS,
  NOTES_FAIL,

  NOTES_SELECT,
  NOTES_SELECTALL,

  NOTESDEL_REQUEST,
  NOTESDEL_SUCCESS,
  NOTESDEL_FAIL,

} from '../constants/Notes';

const initialState = {
  notesarr: [],
  noteslength: '',

  fetching: false,
  fetchmessage: '',
  completemess: '',

  error: ''
}

export default function notes(state = initialState, action) {
  switch (action.type) {
    case NOTES_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Получаю список заметок',
              noteslength: action.payload };
    case NOTES_SUCCESS:
      return {...state, error: '', fetching: false, notesarr: action.payload,
              noteslength: action.payload.length };
    case NOTES_FAIL:
      return {...state, fetching: false, error: action.payload };


    case NOTES_SELECT:
      return {...state, notesarr: action.payload };

    case NOTES_SELECTALL:
      return {...state, notesarr: action.payload };


    case NOTESDEL_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Удаляю заметки',
              moteslength: action.payload };

    case NOTESDEL_SUCCESS:
      return {...state, fetchin: false, completemess: 'Удалил заметки'};

    case NOTESDEL_FAIL:
      return {...state, fetching: false, error: action.payload };

    default:
      return state;

  }
}
