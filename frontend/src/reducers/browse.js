import {
  MINE_REQUEST,
  MINE_SUCCESS,
  MINE_FAILURE,
  TEMPLATES_REQUEST,
  TEMPLATES_SUCCESS,
  TEMPLATES_FAILURE,
} from '../actions/browse';
import {
  STAR_REQUEST,
  STAR_SUCCESS,
  STAR_FAILURE,
} from '../actions/template';
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

  case STAR_REQUEST: {
    const i = state.templates.findIndex(t => t._id === action.templateId);
    const t = state.templates[i];
    const newT = Object.assign(t, { togglingStar: true });

    return {
      ...state,
      templates: [
        ...state.templates.slice(0,i),
        newT,
        ...state.templates.slice(i+1)
      ],
    };
  }
  case STAR_SUCCESS: {
    const i = state.templates.findIndex(t => t._id === action.templateId);
    const t = state.templates[i];
    const newT = Object.assign(t, { stars: action.stars, togglingStar: false });

    return {
      ...state,
      templates: [
        ...state.templates.slice(0,i),
        newT,
        ...state.templates.slice(i+1)
      ],
    };
  }
  case STAR_FAILURE: {
    const i = state.templates.findIndex(t => t._id === action.templateId);
    const t = state.templates[i];
    const newT = Object.assign(t, { togglingStar: false });

    return {
      ...state,
      templates: [
        ...state.templates.slice(0,i),
        newT,
        ...state.templates.slice(i+1)
      ],
    };
  }

  default:
    return state;
  }
}

export default browse;
