import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LineTo from 'react-lineto';

const CoursePrereqLines = ({ course }) =>
  <React.Fragment>
    {course && course.prereqs ? course.prereqs.map(prereq => (
      <LineTo
        key={Math.random()}
        from={prereq.subject+'-'+prereq.number}
        to={course.subject+'-'+course.number}
        toAnchor={'50% 50%'}
        borderColor="red"
        borderWidth={3}
      />
    )) : null}
  </React.Fragment>
;
CoursePrereqLines.propTypes = { course: PropTypes.object };

const CoursePrereqLinesContainer = connect(
  state => ({
    course: state.plan.courses[state.ui.courseHoveringOver],
  }),
  dispatch => ({}),
)(CoursePrereqLines);

export default CoursePrereqLinesContainer;
