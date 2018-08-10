import {
  MINE_REQUEST,
  MINE_SUCCESS,
  MINE_FAILURE,
  TEMPLATES_REQUEST,
  TEMPLATES_SUCCESS,
  TEMPLATES_FAILURE,
} from '../actions/browse';
import { DELETE_PLAN_SUCCESS, SAVE_PLAN_SUCCESS } from '../actions/plan-api';

const initialState = {
  loading_my_plans: true,
  my_plans: null,
  loadingTemplates: true,
  templates: null,
};

function browse(state = initialState, action) {
  switch(action.type) {
  case MINE_REQUEST:
    return { ...state, loading_my_plans: true };
  case MINE_FAILURE:
    return { ...state, loading_my_plans: false, my_plans: { error: true } };
  case MINE_SUCCESS:
    return { ...state, loading_my_plans: false, my_plans: action.plans };
  case DELETE_PLAN_SUCCESS:
  case SAVE_PLAN_SUCCESS:
    return { ...state, loading_my_plans: false, my_plans: null };
  case TEMPLATES_REQUEST:
    return { ...state, loadingTemplates: true };
  case TEMPLATES_SUCCESS:
    return { ...state, templates: action.templates, loadingTemplates: false };
  case TEMPLATES_FAILURE:
    return { ...state, loadingTemplates: false, templates: { error: true } };
  default:
    return state;
  }
}

export default browse;
