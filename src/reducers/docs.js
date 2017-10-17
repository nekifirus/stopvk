import {
  DOCS_REQUEST,
  DOCS_SUCCESS,
  DOCS_FAIL,

  DOCS_SELECT,
  DOCS_SELECTALL,

  DOCSDEL_REQUEST,
  DOCSDEL_SUCCESS,
  DOCSDEL_FAIL,

} from '../constants/Docs';


const initialState = {
  docsarr: [],
  docslength: '',

  fetching: false,
  fetchmessage: '',
  completemess: '',

  error: ''
}

export default function docs(state = initialState, action) {
  switch (action.type) {
    case DOCS_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Получаю список документов',
              docslength: action.payload };
    case DOCS_SUCCESS:
      return {...state, error: '', fetching: false, docsarr: action.payload,
              docslength: action.payload.length };
    case DOCS_FAIL:
      return {...state, fetching: false, error: action.payload };


    case DOCS_SELECT:
      return {...state, docsarr: action.payload };

    case DOCS_SELECTALL:
      return {...state, docsarr: action.payload };


    case DOCSDEL_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Удаляю документы',
              moteslength: action.payload };

    case DOCSDEL_SUCCESS:
      return {...state, fetchin: false, completemess: 'Удалил документы'};

    case DOCSDEL_FAIL:
      return {...state, fetching: false, error: action.payload };

    default:
      return state;

  }
}
