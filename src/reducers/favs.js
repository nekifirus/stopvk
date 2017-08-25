import {
  FAVSINDEX_FAIL,
  FAVSINDEX_SUCCESS,
  
} from '../constants/Favs';

const initialState = {
  favs: [],
  fetching: false,
  error: ''
}

export default function user(state = initialState, action) {

  switch(action.type) {
    
    default:
      return state
  }
}