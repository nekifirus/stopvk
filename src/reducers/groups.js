import {
  GROUPS_REQUEST,
  GROUPS_SUCCESS,
  GROUPS_FAIL,

  GROUPS_SELECT,

  GROUPSDEL_REQUEST,
  GROUPSDEL_SUCCESS,
  GROUPSDEL_FAIL
} from '../constants/Groups';



const initialState = {
  groupsarr: [],
  selectedgroups: 0,
  percent: '',

  fetching: false,
  fetchmessage: '',
  completemess: '',

  error: ''
}

export default function groups(state = initialState, action) {

  switch(action.type) {
    case GROUPS_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Получаю список групп', percent: action.percent};
    case GROUPS_SUCCESS:
      return {...state, error: '', fetching: false, groupsarr: action.payload };
    case GROUPS_FAIL:
      return {...state, fetching: false, error: action.payload };


    case GROUPS_SELECT:
      return {...state, groupsarr: action.payload, selectedgroups: action.selectedgroups };


    case GROUPSDEL_REQUEST:
      return {...state, fetching: true, fetchmessage: 'Выхожу из групп',
              percent: action.percent };

    case GROUPSDEL_SUCCESS:
      return {...state, fetching: false, groupsarr: action.payload, selectedgroups: action.selectedgroups };

    case GROUPSDEL_FAIL:
      return {...state, fetching: false, error: action.payload };

    default: return state;

  }
}
