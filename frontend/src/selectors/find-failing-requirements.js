import { createSelector } from 'reselect';

const getPlanState = state => state.plan;

export default createSelector(
  [getPlanState],
  (planState) => {
    const { courses, requirements } = planState;

    if(!requirements || Object.keys(requirements).length === 0) {
      return {};
    }

    let courseMap = Object.values(courses).reduce((map, course) => {
      map[course.subject + course.number] = true;
      return map;
    }, {});

    return Object.values(requirements).reduce((failed, req) => {
      failed[req.fid] = !testReq(req, courseMap, courses);
      return failed;
    }, {});
  }
);

// Calls the right function based on the requirement type
function testReq(req, courseMap, courses) {
  switch(req.type) {

  case 'COURSE':    return courseType(req, courseMap);
  case 'ATTRIBUTE': return attributeType(req, courses);
  default:          return false;

  }
}

// If type is course and we can find a course with one of the given
// course codes, this is valid.
function courseType(req, courseMap) {
  return !!req.value.split(',').some(code => courseMap[code.trim().split(/\s|-/).join('')]);
}

function attributeType(req, courses) {
  // No course assigned? No good.
  if(!req.course) {
    return false;
  }

  // Course doesn't exist? No good.
  if(!courses[req.course]) {
    return false;
  }

  // Course has no attributes? No good.
  if(!courses[req.course].attributes) {
    return false;
  }

  // Course does not have this attribute? No good.
  if(!courses[req.course].attributes.includes(req.value)) {
    return false;
  }

  // Good.
  return true;
}
