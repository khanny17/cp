import React from 'react';
import { connect } from 'react-redux';
import '../css/course.css';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import InlineEdit from 'react-edit-inline';
import { updateCourse } from '../actions/plan';

class Course extends React.Component {
  state = { editing: null }

  handleChange(c) {
    if(c.header) {
      c.subject = c.header.split(' ')[0];
      c.number = c.header.split(' ')[1];
      delete c.header;
    }
    c.fid = this.props.course.fid;
    this.props.updateCourse(c);
  }

  handleKeyPress(e) {
    if(e.key === 'Enter' || !this.state.editing) {
      const element_class_name = document.activeElement.className;
      this.setState({ editing: element_class_name });
    }
  }

  validateHeader(s) {
    return s.split(' ').length === 2;
  }

  validateCredits(s) {
    return !isNaN(s);
  }

  render() {
    const { course } = this.props;
    return (
      <div className="course"
        onKeyPress={e => this.handleKeyPress(e)}
      >
        <InlineEdit
          className="course-header"
          activeClassName="editing"
          editing={this.state.editing === 'course-header'}
          tabIndex={0}
          paramName="header"
          change={this.handleChange.bind(this)}
          validate={s => this.validateHeader(s)}
          text={ course.subject + ' ' + course.number } />
        <InlineEdit
          className="course-title"
          activeClassName="editing"
          editing={this.state.editing === 'course-title'}
          tabIndex={0}
          paramName="title"
          change={this.handleChange.bind(this)}
          text={ course.title } />
        <InlineEdit
          className="course-credits"
          activeClassName="editing"
          editing={this.state.editing === 'course-credits'}
          tabIndex={0}
          paramName="credits"
          change={this.handleChange.bind(this)}
          validate={s => this.validateCredits(s)}
          text={ '' + course.credits } />
      </div>
    );
  }
}

Course.propTypes = {
  course: PropTypes.object,
  updateCourse: PropTypes.func,
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
  dispatch => ({
    updateCourse: updates => dispatch(updateCourse(updates)),
  }),
)(DraggableCourse);

export default CourseContainer;
