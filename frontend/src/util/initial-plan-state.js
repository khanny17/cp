import uuidv4 from 'uuid/v4';
import getRandomInt from './get-random-int';

export default function makeNewPlan() {
  let plan = { fid: 'new', title: 'New Plan', years: [], requirements: [] };

  let plans = { [plan.fid]: plan };
  let years = {};
  let terms = {};
  let courses = {};

  for(var y = 1; y < 5; y++) {
    let year = {
      fid: uuidv4(),
      title: 'Year ' + y,
      terms: [],
    };

    for(var t = 1; t < 3; t++) {
      let term = {
        fid: uuidv4(),
        title: t % 2 ? 'Fall' : 'Spring',
        courses: [],
      };

      for(var c = 1; c < 6; c++) {
        let course = {
          fid: uuidv4(),
          title: 'Course ' + c,
          subject: 'SUBJ',
          number: '' + y + t + c,
          credits: getRandomInt(1, 5),
          attributes: [],
        };

        courses[course.fid] = course;
        term.courses.push(course.fid);
      }

      terms[term.fid] = term;
      year.terms.push(term.fid);
    }

    years[year.fid] = year;
    plan.years.push(year.fid);
  }

  return {
    plan: plan.fid,
    plans,
    years,
    terms,
    courses,
    saving: false,
    colorscheme: { SUBJ: '#607d8b' },
    requirements: {},
  };
}
