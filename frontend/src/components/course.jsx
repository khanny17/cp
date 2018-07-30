import React from 'react';
import { connect } from 'react-redux';
import '../css/course.css';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Course = ({ course }) => (
  <div className="course">
    <p className="course-header">
      { course.subject + ' ' + course.number }
    </p>
    <p className="course-title">{ course.title }</p>
    <p className="course-credits">{ course.credits }</p>
  </div>
);

Course.propTypes = {
  course: PropTypes.object,
};

const DraggableCourse = (props) => (
  <Draggable
    draggableId={props.course.fid}
    type="TERM-COURSE"
    index={props.index}
  >
    {(provided, snapshot) => (
      <div>
        <div
          className="course-wrapper"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            opacity: snapshot.isDragging ? '.5' : '1',
            ...provided.draggableProps.style,
          }}
        >
          <Course {...props}/>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);

DraggableCourse.propTypes = {
  course: PropTypes.object,
  index: PropTypes.number,
};

const CourseContainer = connect(
  (state, { course }) => ({ course: state.plan.courses[course] }),
  dispatch => ({}),
)(DraggableCourse);

export default CourseContainer;
