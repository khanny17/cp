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
  my_plans: { data: null, loading: false, error: false },
  templates: { data: null, loading: false, error: false },
};

function browse(state = initialState, action) {
  switch(action.type) {

  case MINE_REQUEST:
    return {
      ...state,
      my_plans: { data: null, loading: true, error: false },
    };
  case MINE_FAILURE:
    return {
      ...state,
      my_plans: { data: null, loading: false, error: true },
    };
  case MINE_SUCCESS:
    return {
      ...state,
      my_plans: { data: action.plans, loading: false, error: false },
    };

  case DELETE_PLAN_SUCCESS:
  case SAVE_PLAN_SUCCESS:
    return {
      ...state,
      my_plans: { data: null, loading: false, error: false },
    };

  case TEMPLATES_REQUEST:
    return {
      ...state,
      templates: { data: null, loading: true, error: false },
    };
  case TEMPLATES_SUCCESS:
    return {
      ...state,
      templates: {
        data: arrToObj(action.templates, '_id'), //TODO move this to the action
        loading: false,
        error: false,
      },
    };
  case TEMPLATES_FAILURE:
    return {
      ...state,
      templates: { data: null, loading: false, error: true },
    };

  case STAR_REQUEST:
    return {
      ...state,
      templates: {
        ...state.templates,
        data: {
          ...state.templates.data,
          [action.templateId]: {
            ...state.templates.data[action.templateId],
            togglingStar: true,
          },
        },
      },
    };
  case STAR_SUCCESS:
    return {
      ...state,
      templates: {
        ...state.templates,
        data: {
          ...state.templates.data,
          [action.templateId]: {
            ...state.templates.data[action.templateId],
            stars: action.stars,
            togglingStar: false,
          },
        },
      },
    };
  case STAR_FAILURE:
    return {
      ...state,
      templates: {
        ...state.templates,
        data: {
          ...state.templates.data,
          [action.templateId]: {
            ...state.templates.data[action.templateId],
            togglingStar: false,
          },
        },
      },
    };

  case TEMPLATE_REQUEST:
    return {
      ...state,
      templates: {
        ...state.templates,
        data: {
          ...state.templates.data,
          [action.id]: {
            ...state.templates.data[action.id],
            loading: true,
          },
        },
      }
    };
  case TEMPLATE_SUCCESS:
    return {
      ...state,
      templates: {
        ...state.templates,
        data: {
          ...state.templates.data,
          [action.template._id]: {
            ...state.templates.data[action.template._id],
            ...action.template,
            loading: false,
          }
        }
      }
    };

  case TEMPLATE_FAILURE:
    return {
      ...state,
      templates: {
        ...state.templates,
        data: {
          ...state.templates.data,
          [action.id]: {
            ...state.templates.data[action.id],
            loading: false,
          }
        }
      }
    };


  default:
    return state;
  }
}

export default browse;
