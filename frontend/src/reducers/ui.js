import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from '../actions/auth';

import {
  SHOW_TRASH,
  HIDE_TRASH,
  TOGGLE_REQUIREMENTS_SIDEBAR,
  MOUSE_ENTER_COURSE,
  MOUSE_LEAVE_COURSE,
} from '../actions/ui';

import {
  ADD_YEAR,
  ADD_TERM,
  ADD_COURSE,
  MOVE_YEAR,
  MOVE_TERM,
  MOVE_COURSE,
  DELETE_ITEM,
  UPDATE_PLAN,
  UPDATE_YEAR,
  UPDATE_TERM,
  UPDATE_COURSE,
  ADD_REQUIREMENT,
  UPDATE_REQUIREMENT,
  ASSIGN_REQUIREMENT,
  DELETE_REQUIREMENT,
} from '../actions/plan';

import {
  SAVE_PLAN_SUCCESS,
  LOAD_PLAN_SUCCESS,
  DELETE_PLAN_SUCCESS,
  NEW_PLAN,
} from '../actions/plan-api';


const initialState = {
  requestingLogin: false,
  requestingRegister: false,
  showTrash: false,
  showReqsSidebar: false,
  unsavedChanges: true,
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
  case TOGGLE_REQUIREMENTS_SIDEBAR:
    return { ...state, showReqsSidebar: !state.showReqsSidebar };

  case MOUSE_ENTER_COURSE:
    return { ...state, courseHoveringOver: action.courseId };
  case MOUSE_LEAVE_COURSE:
    return { ...state, courseHoveringOver: null };

  case ADD_YEAR:
  case ADD_TERM:
  case ADD_COURSE:
  case MOVE_YEAR:
  case MOVE_TERM:
  case MOVE_COURSE:
  case DELETE_ITEM:
  case UPDATE_PLAN:
  case UPDATE_YEAR:
  case UPDATE_TERM:
  case UPDATE_COURSE:
  case ADD_REQUIREMENT:
  case UPDATE_REQUIREMENT:
  case ASSIGN_REQUIREMENT:
  case DELETE_REQUIREMENT:
  case NEW_PLAN:
    return { ...state, unsavedChanges: true };
  case SAVE_PLAN_SUCCESS:
  case LOAD_PLAN_SUCCESS:
  case DELETE_PLAN_SUCCESS:
    return { ...state, unsavedChanges: false };

  default:
    return state;
  }
}

export default ui;
