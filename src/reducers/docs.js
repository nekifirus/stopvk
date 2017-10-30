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
  selecteddocs: '',

  fetching: false,
  fetchmessage: '',

  error: ''
}

export default function docs(state = initialState, action) {
  switch (action.type) {
    case DOCS_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Получаю список документов'};
    case DOCS_SUCCESS:
      return {...state, error: '', fetching: false, docsarr: action.payload};
    case DOCS_FAIL:
      return {...state, fetching: false, error: action.payload };


    case DOCS_SELECT:
      return {...state, docsarr: action.payload, selecteddocs: action.selecteddocs };

    case DOCS_SELECTALL:
      return {...state, docsarr: action.payload, selecteddocs: action.selecteddocs };


    case DOCSDEL_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Удаляю документы'};

    case DOCSDEL_SUCCESS:
      return {...state, fetching: false, docsarr: action.payload, selecteddocs: action.selecteddocs };

    case DOCSDEL_FAIL:
      return {...state, fetching: false, error: action.payload };

    default:
      return state;

  }
}
