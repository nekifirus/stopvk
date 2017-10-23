import {
  DL_START,
  DL_PROGRESS,
  DL_STOP,
  DL_FAIL
} from '../constants/Downloader';


const initialState = {
  trigger: false,
  percent: '',
  file: '',
  error: ''
}


export default function downloader(state = initialState, action) {
  switch (action.type) {
    case DL_START:
      return {...state, trigger: true};
    case DL_PROGRESS:
      return {...state, percent: action.percent, file: action.file };
    case DL_STOP:
      return {...state, trigger: false, percent: '', file: ''};
    case DL_FAIL:
      return {...state, error: action.payload, trigger: false, percent: '', file: ''}

    default:
      return {...state};

  }
}
