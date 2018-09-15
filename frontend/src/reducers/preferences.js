import {
  SET_PREFS_REQUEST,
  SET_PREFS_SUCCESS,
  SET_PREFS_FAILURE,
  GET_PREFS_REQUEST,
  GET_PREFS_SUCCESS,
  GET_PREFS_FAILURE,
} from '../actions/preferences';

const initialState = {
  data: null,
  loading: false,
  error: false,
};

function preferences(state = initialState, action) {
  switch(action.type) {
  case SET_PREFS_REQUEST:
    return { ...state, loading: true, error: false };
  case SET_PREFS_FAILURE:
    return { ...state, loading: false, error: action.err };
  case SET_PREFS_SUCCESS:
    return { data: action.prefs, loading: false, error: false };

  case GET_PREFS_REQUEST:
    return { ...state, loading: true, error: false };
  case GET_PREFS_FAILURE:
    return { ...state, loading: false, error: action.err };
  case GET_PREFS_SUCCESS:
    return { data: action.prefs, loading: false, error: false };

  default:
    return state;
  }
}

export default preferences;
