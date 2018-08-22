import React from 'react';
import PropTypes from 'prop-types';

const PlanPreview = ({ plan }) =>
  <div className="year-container" style={{ textAlign: 'center' }}>
    {plan.details.years.map(y => plan.years[y]).map(year => (
      <div key={year.fid} className="year" style={{ marginRight: '10px' }}>
        <div>{year.title}</div>
        <div className="term-container">
          {year.terms.map(t => plan.terms[t]).map(term => (
            <div key={term.fid}
              className={term.minimized ? 'term minimized' : 'term'}> 
              <h3>{term.title}</h3>
              <div className="course-container">
                {term.courses.map(c => plan.courses[c]).map(course => (
                  <div key={course.fid} className="course"
                    style={{ background: plan.colorscheme[course.subject] }}>
                    <div className="course-header">
                      {course.subject + ' ' + course.number}
                    </div>
                    <div className="course-title">
                      {course.title}
                    </div>
                    <div style={{ flex: 1 }} />
                    <div className="course-credits">
                      {course.credits}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
;

PlanPreview.propTypes = { plan: PropTypes.object };

export default PlanPreview;
