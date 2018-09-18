import uuidv4 from 'uuid/v4';
import randomColor from 'randomcolor';

import { LOGOUT } from '../actions/auth';

import {
  ADD_YEAR,
  ADD_TERM,
  ADD_COURSE,

  MOVE_YEAR,
  MOVE_TERM,
  MOVE_COURSE,
  MINIMIZE_TERM,

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

  case NEW_PLAN: {
    let newPlan = makeNewPlan();
    if(action.template) {
      return {
        ...newPlan,
        ...action.template,
        plans: {
          new: {
            fid: 'new',
            ...action.template.details,
          }
        }
      };
    }

    return newPlan;
  }

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

  case MINIMIZE_TERM:
    return {
      ...state,
      terms: {
        ...state.terms,
        [action.term]: {
          ...state.terms[action.term],
          minimized: !state.terms[action.term].minimized,
        }
      }
    };


  case ADD_REQUIREMENT: {
    const req = { fid: uuidv4(), type: null, value: '' };
    return {
      ...state,
      requirements: { ...state.requirements, [req.fid]: req },
      plans: {
        ...state.plans,
        [state.plan]: {
          ...state.plans[state.plan],
          requirements: state.plans[state.plan].requirements.concat(req.fid),
        },
      },
    };
  }
  case UPDATE_REQUIREMENT: {
    const { fid, ...updates } = action.updates;

    // If we change the type, wipe the assigned course
    if(updates.type && updates.type !== state.requirements[fid].type) {
      updates.course = null;      
    }

    return {
      ...state,
      requirements: {
        ...state.requirements,
        [fid]: {
          ...state.requirements[fid],
          ...updates,
        },
      },
    };
  }
  case ASSIGN_REQUIREMENT: {
    const { reqId, destId } = action;
    if(destId === 'REQUIREMENTS') {
      return state;
    }
    return {
      ...state,
      requirements: {
        ...state.requirements,
        [reqId]: { ...state.requirements[reqId], course: destId },
      },
    };
  }
  case DELETE_REQUIREMENT: {
    const planId = state.plan;
    const { [action.reqId]: deleted, ...newReqState } = state.requirements;
    return {
      ...state,
      requirements: newReqState,
      plans: {
        ...state.plans,
        [planId]: {
          ...state.plans[planId],
          requirements:
            state.plans[planId].requirements.filter(r => r !== action.reqId),
        },
      }
    };
  }

  case UPDATE_PLAN: {
    const { title } = action.updates;
    return {
      ...state,
      plans: {
        ...state.plans,
        [state.plan]: {
          ...state.plans[state.plan],
          title: title,
        }
      }
    };
  }
  case UPDATE_YEAR: {
    const { fid, updates } = action;
    return {
      ...state,
      years: {
        ...state.years,
        [fid]: {
          ...state.years[fid],
          ...updates,
        }
      }
    };
  }

  case UPDATE_TERM: {
    const { fid, updates } = action;
    return {
      ...state,
      terms: {
        ...state.terms,
        [fid]: {
          ...state.terms[fid],
          ...updates,
        }
      }
    };
  }

  case UPDATE_COURSE: {
    const { fid, subject, color } = action.updates;
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
        [subject]: color || state.colorscheme[subject] || randomColor({ luminosity: 'dark'}),
      },
    };
  }


  case SAVE_PLAN_REQUEST:
    return {
      ...state,
      saving: true,
    };
  case SAVE_PLAN_SUCCESS: {
    const { years, terms, courses, _id, details, colorscheme,
      requirements } = action.data;
    return {
      ...state,
      saving: false,
      years,
      terms,
      courses,
      plans: {
        [_id]: { ...details, fid: _id, _id: _id },
      },
      plan: _id,
      colorscheme,
      requirements,
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
    const { years, terms, courses, _id, details, colorscheme,
      requirements } = action.data;
    return {
      ...state,
      loading: false,
      failed: false,
      years,
      terms,
      courses,
      plans: {
        [_id]: { ...details, fid: _id, _id: _id },
      },
      plan: _id,
      colorscheme,
      requirements,
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
  const { delete_type, item_fid } = action;
  let { list_fid } = action;

  let item_type, list_type;
  if(delete_type === 'PLAN-YEAR') {
    item_type = 'years';
    list_type = 'plans';
    list_fid = state.plan;
  } else if(delete_type === 'YEAR-TERM') {
    item_type = 'terms';
    list_type = 'years';
  } else if(delete_type === 'TERM-COURSE') {
    item_type = 'courses';
    list_type = 'terms';
  } else {
    throw new Error('The devs screwed something up');
  }

  if(!list_fid) {
    //the list id is optional. If we dont have it, we have to find the list
    //where this belongs
    list_fid = Object.keys(state[list_type]).find(fid =>
      state[list_type][fid][item_type].find(c_fid => c_fid === item_fid));
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
  const { subject, color } = course;
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
    colorscheme: {
      ...state.colorscheme,
      // This will wind up setting a color for undefined, but meh it's fine
      [subject]: color ||
                 state.colorscheme[subject] ||
                 randomColor({ luminosity: 'dark'}),
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
