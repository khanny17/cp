import uuidv4 from 'uuid/v4';

import { LOGOUT } from '../actions/auth';

import {
  ADD_YEAR,
  ADD_TERM,
  ADD_COURSE,
  MOVE_YEAR,
  MOVE_TERM,
  MOVE_COURSE,
  DELETE_ITEM,
  UPDATE_COURSE,
} from '../actions/plan';

import {
  SAVE_PLAN_REQUEST,
  SAVE_PLAN_SUCCESS,
  SAVE_PLAN_FAILURE,
  LOAD_PLAN_REQUEST,
  LOAD_PLAN_SUCCESS,
  LOAD_PLAN_FAILURE,
  DELETE_PLAN_SUCCESS,
  NEW_PLAN,
} from '../actions/plan-api';


import makeNewPlan from '../util/initial-plan-state';

const initialState = makeNewPlan();


function plan(state = initialState, action) {
  switch(action.type) {

  case LOGOUT:
    return initialState;

  case NEW_PLAN:
    return makeNewPlan();

  case ADD_YEAR:
    return addYear(state, action.year);
  case ADD_TERM:
    return addTerm(state, action.yearId, action.term);
  case ADD_COURSE:
    return addCourse(state, action.termId, action.course);
  case MOVE_COURSE:
    return moveCourse(state, action.courseId, action.source, action.dest);
  case MOVE_TERM:
    return moveTerm(state, action.termId, action.source, action.dest);
  case MOVE_YEAR:
    return moveYear(state, action.yearId, action.source, action.dest);
  case DELETE_ITEM:
    return deleteItem(state, action);
  case UPDATE_COURSE: {
    const { fid, subject } = action.updates;
    return {
      ...state,
      courses: {
        ...state.courses,
        [fid]: {
          ...state.courses[fid],
          ...action.updates,
        },
      },
      colorscheme: {
        ...state.colorscheme,
        // This will wind up setting a color for undefined, but meh it's fine
        [subject]: state.colorscheme[subject] || randomColor({ luminosity: 'dark'}),
      },
    };
  }


  case SAVE_PLAN_REQUEST:
    return {
      ...state,
      saving: true,
    };
  case SAVE_PLAN_SUCCESS: {
    const { years, terms, courses, _id, details } = action.data;
    return {
      ...state,
      saving: false,
      years: years,
      terms: terms,
      courses: courses,
      plans: {
        [_id]: { ...details, fid: _id, _id: _id },
      },
      plan: _id,
    };
  }
  case SAVE_PLAN_FAILURE:
    return {
      ...state,
      saving: false,
    };

  case LOAD_PLAN_REQUEST:
    return {
      ...state,
      loading: true,
      failed: false,
    };
  case LOAD_PLAN_SUCCESS: {
    const { years, terms, courses, _id, details, colorscheme } = action.data;
    return {
      ...state,
      loading: false,
      failed: false,
      years: years,
      terms: terms,
      courses: courses,
      plans: {
        [_id]: { ...details, fid: _id, _id: _id },
      },
      plan: _id,
      colorscheme,
    };
  }
  case LOAD_PLAN_FAILURE:
    return {
      ...state,
      loading: false,
      plans: { [action.planId]: { failed: true } }
    };

  case DELETE_PLAN_SUCCESS: {
    const delId = action.deletedId;

    // We don't care unless we deleted the current open plan
    if(delId !== state.plan) {
      return state;
    }

    // In that case, swap to use a new fid instead of the _id
    // as a key and delete the _id from the plan
    const newId = uuidv4();
    const { _id, ...updatedPlan } = Object.assign({}, state.plans[delId]);
    updatedPlan.fid = newId;

    return {
      ...state,
      plans: {
        [delId]: null,
        [newId]: updatedPlan,
      },
      plan: newId,
    };
  }

  default:
    return state;

  }
}

function deleteItem(state, action) {
  const { delete_type, item_fid, list_fid } = action;

  let item_type, list_type;
  if(delete_type === 'PLAN-YEAR') {
    item_type = 'years';
    list_type = 'plan';
  } else if(delete_type === 'YEAR-TERM') {
    item_type = 'terms';
    list_type = 'years';
  } else if(delete_type === 'TERM-COURSE') {
    item_type = 'courses';
    list_type = 'terms';
  } else {
    throw new Error('The devs screwed something up');
  }

  // Remove from the dict and from the list it came from
  let newState = {
    ...state,
    // Remove from the list
    [list_type]: {
      ...state[list_type], 
      [list_fid]: {
        ...state[list_type][list_fid], 
        [item_type]: 
          state[list_type][list_fid][item_type].filter(x => x !== item_fid),
      },
    },
  };

  // Remove from dict
  delete newState[item_type][item_fid];
  return newState;
}


function addYear(state, year) {
  const planId = state.plan;

  return {
    ...state,
    plans: {
      ...state.plans,
      [planId]: {
        ...state.plans[planId],
        years: state.plans[planId].years.concat(year.fid),
      },
    },
    years: {
      ...state.years,
      [year.fid]: year,
    },
  };
}

function addTerm(state, yearId, term) {
  return {
    ...state,
    years: {
      ...state.years,
      [yearId]: {
        ...state.years[yearId],
        terms: state.years[yearId].terms.concat(term.fid),
      },
    },
    terms: {
      ...state.terms,
      [term.fid]: term,
    },
  };
}

function addCourse(state, termId, course) {
  return {
    ...state,
    terms: {
      ...state.terms,
      [termId]: {
        ...state.terms[termId],
        courses: state.terms[termId].courses.concat(course.fid),
      },
    },
    courses: {
      ...state.courses,
      [course.fid]: course,
    },
  };
}

function moveYear(state, yearId, source, dest) {
  return move(state, yearId, source, dest, 'plans', 'years');
}

function moveTerm(state, termId, source, dest) {
  return move(state, termId, source, dest, 'years', 'terms');
}

function moveCourse(state, courseId, source, dest) {
  return move(state, courseId, source, dest, 'terms', 'courses');
}

function move(state, dropId, source, dest, listType, dropType) {
  // If it stayed in the same list
  if(source.id === dest.id) {
    const list = state[listType][source.id][dropType];
    const result = Array.from(list);
    const [removed] = result.splice(source.index, 1);
    result.splice(dest.index, 0, removed);

    return {
      ...state,
      [listType]: {
        ...state[listType],
        [source.id]: {
          ...state[listType][source.id],
          [dropType]: result,
        },
      }
    };
  }

  // If it changed lists
  const sourceList = state[listType][source.id][dropType];
  const destList = state[listType][dest.id][dropType];
  const sourceClone = Array.from(sourceList);
  const destClone = Array.from(destList);
  const [removed] = sourceClone.splice(source.index, 1);

  destClone.splice(dest.index, 0, removed);

  return {
    ...state,
    [listType]: {
      ...state[listType],
      [source.id]: {
        ...state[listType][source.id],
        [dropType]: sourceClone,
      },
      [dest.id]: {
        ...state[listType][dest.id],
        [dropType]: destClone,
      },
    }
  };
}

export default plan;
