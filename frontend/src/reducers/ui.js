import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from '../actions/auth';

import { SHOW_TRASH, HIDE_TRASH } from '../actions/ui';


const initialState = {
  requestingLogin: false,
  requestingRegister: false,
  showTrash: false,
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
  case SHOW_TRASH:
    return { ...state, showTrash: true };
  case HIDE_TRASH:
    return { ...state, showTrash: false };
  default:
    return state;
  }
}

export default ui;
