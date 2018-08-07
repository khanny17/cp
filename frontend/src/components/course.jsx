import React from 'react';
import { connect } from 'react-redux';
import '../css/course.css';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import InlineEdit from 'react-edit-inline';
import { updateCourse, deleteItem } from '../actions/plan';
import { ContextMenuTrigger } from 'react-contextmenu';
import CourseContextMenu from './course-contextmenu';


class Course extends React.Component {
  state = { editing: null, menu: {} }

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
    const { course, color } = this.props;
    return (
      <div className="course"
        style={{ background: color }}
        onKeyPress={this.handleKeyPress.bind(this)}
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
        <div style={{ flex: 1 }} />
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
  color: PropTypes.string,
  updateCourse: PropTypes.func,
};


class ContextMenuCourse extends React.Component {
  handleAction(e, data) {
    switch(data.action) {
    case 'delete':
      this.props.deleteCourse(this.props.course.fid);
      break;
    case 'edit':
      this.openEditModal();
      break;
    default:
      return;
    }
  }

  render() {
    return (
      <React.Fragment>
        <ContextMenuTrigger id={this.props.course.fid}>
          <Course {...this.props}/>
        </ContextMenuTrigger>

        <CourseContextMenu id={this.props.course.fid}
          onClick={this.handleAction.bind(this)} />
      </React.Fragment>
    );
  }
}
ContextMenuCourse.propTypes = {
  course: PropTypes.object,
  deleteCourse: PropTypes.func,
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
          <ContextMenuCourse {...props}/>
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
  (state, { course }) => ({
    course: state.plan.courses[course],
    color: state.plan.colorscheme[state.plan.courses[course].subject],
  }),
  dispatch => ({
    updateCourse: updates => dispatch(updateCourse(updates)),
    deleteCourse: fid => dispatch(deleteItem('TERM-COURSE', fid)),
  }),
)(DraggableCourse);

export default CourseContainer;
