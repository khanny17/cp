import { arrToObj } from '../util/js-helpers';

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
  TEMPLATE_REQUEST,
  TEMPLATE_SUCCESS,
  TEMPLATE_FAILURE,
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
    return {
      ...state,
      templates: arrToObj(action.templates, '_id'),
      loadingTemplates: false,
    };
  case TEMPLATES_FAILURE:
    return { ...state, loadingTemplates: false, templates: { error: true } };

  case STAR_REQUEST:
    return {
      ...state,
      templates: {
        ...state.templates,
        [action.templateId]: {
          ...state.templates[action.templateId],
          togglingStar: true,
        },
      },
    };
  case STAR_SUCCESS:
    return {
      ...state,
      templates: {
        ...state.templates,
        [action.templateId]: {
          ...state.templates[action.templateId],
          stars: action.stars,
          togglingStar: false,
        },
      },
    };
  case STAR_FAILURE:
    return {
      ...state,
      templates: {
        ...state.templates,
        [action.templateId]: {
          ...state.templates[action.templateId],
          togglingStar: false,
        },
      },
    };

  case TEMPLATE_REQUEST:
    return {
      ...state,
      templates: {
        ...state.templates,
        [action.id]: {
          ...state.templates[action.id],
          loading: true,
        }
      }
    };
  case TEMPLATE_SUCCESS:
    return {
      ...state,
      templates: {
        ...state.templates,
        [action.template._id]: {
          ...state.templates[action.template._id],
          ...action.template,
          loading: false,
        }
      }
    };

  case TEMPLATE_FAILURE:
    return {
      ...state,
      templates: {
        ...state.templates,
        [action.id]: {
          ...state.templates[action.id],
          loading: false,
        }
      }
    };


  default:
    return state;
  }
}

export default browse;
