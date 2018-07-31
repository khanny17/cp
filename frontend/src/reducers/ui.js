import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from '../actions/auth';


const initialState = {
  requestingLogin: false,
  requestingRegister: false,
};

function ui(state = initialState, action) {
  switch(action.type) {
  case LOGIN_REQUEST:
    return { ...state, requestingLogin: true };
  case LOGIN_FAILURE:
    return { ...state, requestingLogin: false };
  case LOGIN_SUCCESS:
    return { ...state, requestingLogin: false };
  case REGISTER_REQUEST:
    return { ...state, requestingRegister: true };
  case REGISTER_FAILURE:
    return { ...state, requestingRegister: false };
  case REGISTER_SUCCESS:
    return { ...state, requestingRegister: false };
  default:
    return state;
  }
}

export default ui;
