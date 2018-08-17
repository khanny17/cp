export default function findFailingRequirements(planState) {
  const { courses, requirements } = planState;

  let courseMap = Object.values(courses).reduce((map, course) => {
    map[course.subject + course.number] = true;
    return map;
  });

  return Object.values(requirements).reduce((failed, req) => {
    if(req.type === 'COURSE' &&
      req.value.split(',').some(code =>
        courseMap[code.trim().split(/\s|-/).join('')]
      )) {

      // If type is course and we can find a course with one of the given
      // course codes, this is valid.
      failed[req.fid] = false;
      return failed;
    }

    if(req.type === 'ATTRIBUTE' && req.course &&
      courses[req.course].attributes &&
      courses[req.course].attributes.includes(req.value)) {
      failed[req.fid] = false;
      return failed;
    }

    failed[req.fid] = req;
    return failed;
  });
}
