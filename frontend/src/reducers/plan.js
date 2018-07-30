import {
  ADD_YEAR,
  ADD_TERM,
  ADD_COURSE,
  MOVE_YEAR,
  MOVE_TERM,
  MOVE_COURSE,
} from '../actions/plan';

import initialState from '../util/initial-plan-state';


function plan(state = initialState, action) {
  switch(action.type) {

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
  default:
    return state;

  }
}


function addYear(state, year) {
  return {
    ...state,
    plan: {
      ...state.plan,
      years: [ ...state.plan.years, year.fid ],
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
        terms: state[yearId].terms.concat(term.fid),
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
        courses: state[termId].courses.concat(course.fid),
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
