import uuidv4 from 'uuid/v4';

export const ADD_YEAR = 'ADD_YEAR';
export const ADD_TERM = 'ADD_TERM';
export const ADD_COURSE = 'ADD_COURSE';
export const MOVE_YEAR = 'MOVE_YEAR';
export const MOVE_TERM = 'MOVE_TERM';
export const MOVE_COURSE = 'MOVE_COURSE';

export function addYear(planId, year = {}) {
  return {
    type: ADD_YEAR,
    planId,
    year: { ...year, fid: uuidv4() },
  };
}

export function addTerm(yearId, term = {}) {
  return {
    type: ADD_TERM,
    yearId,
    term: { ...term, fid: uuidv4() },
  };
}

export function addCourse(termId, course = {}) {
  return {
    type: ADD_COURSE,
    termId,
    course: { ...course, fid: uuidv4() },
  };
}

export function moveYear(yearId, source, dest) {
  return {
    type: MOVE_YEAR,
    yearId,
    source,
    dest,
  };
}

export function moveTerm(termId, source, dest) {
  return {
    type: MOVE_TERM,
    termId,
    source,
    dest,
  };
}

export function moveCourse(courseId, source, dest) {
  return {
    type: MOVE_COURSE,
    courseId,
    source,
    dest,
  };
}
