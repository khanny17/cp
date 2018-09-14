import { createSelector } from 'reselect';

const getPlanState = state => state.plan;

/**
 *  This function takes the planState at any time and returns an object with
 *  two properties:
 *
 *  - missingPrereqs: A map of course fid's to a map of prereq course codes
 *  to a message about why they are missing.
 *  If a course fid is in this object, it means it has at least one prequisite
 *  that is not being met in the current state of the plan
 *
 *  - duplicateCodes: A map of course codes to the value true.
 *  If a course code is in this object, it means more than one
 *  course was found with the given subject + number combination
 *
 *
 *  The plan is considered valid if both of these objects are empty
 *
 */
export default createSelector(
  [getPlanState],
  (planState) => {
    let coursesByCode = {};
    //For tracking if we have two courses with the same subject and number
    let duplicateCodes = {};
    let missingPrereqs = {};

    // Our algorithm: traverse in order from beginning to end, putting courses
    // in a map which maps their course code to their info.
    const years = planState.plans[planState.plan].years;
    years.map(id => planState.years[id]).forEach((year, y_index) => {
      year.terms.map(id => planState.terms[id]).forEach((term, t_index) => {
        term.courses.map(id => planState.courses[id]).forEach(course => {
          const code = course.subject + ' ' + course.number;

          //Check for duplicates
          if(coursesByCode[code]) {
            //We have a duplicate!
            duplicateCodes[code] = true;
            return;
          }

          coursesByCode[code] = {
            fid: course.fid,
            prereqs: course.prereqs,
            yearIndex: y_index,
            termIndex: t_index,
          };
        });
      });
    });

    //Now that we have the map constructed, lets go through each entry and check
    //if the prerequisites are planned in earlier terms
    Object.values(coursesByCode).forEach(course => {
      if(!course.prereqs) {
        return;
      }

      course.prereqs.forEach(prereq => {
        const prereqCode = prereq.subject + ' ' + prereq.number;
        const prereqCourse = coursesByCode[prereqCode];

        let problem;

        if(!prereqCourse) {
          // Course is nowhere to be found
          problem = 'Not found in plan';
        } else if(
          (prereqCourse.yearIndex > course.yearIndex) ||
          (prereqCourse.yearIndex === course.yearIndex &&
          prereqCourse.termIndex > course.termIndex)
        ) {
          //Course is either in a later year, or the same year but a later term
          problem = 'Planned for after this course';
        } else if(prereqCourse.yearIndex === course.yearIndex &&
          prereqCourse.termIndex === course.termIndex &&
          !prereq.coreq
        ) {
          //Course is in the same year and term, and is NOT marked a corequisite
          problem = 'Planned for same term as this course';
        }


        if(!problem) {
          return;
        }

        // If this is the first missing prereq for this course,
        // we gotta make the map first
        if(!missingPrereqs[course.fid]) {
          missingPrereqs[course.fid] = {};
        }

        missingPrereqs[course.fid][prereqCode] = problem;
      });
    });

    return {
      missingPrereqs,
      duplicateCodes,
    };
  }
);
