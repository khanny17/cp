import React from 'react';
import { connect } from 'react-redux';
import '../css/course.css';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import InlineEdit from 'react-edit-inline';
import { updateCourse, deleteItem } from '../actions/plan';
import { ContextMenuTrigger } from 'react-contextmenu';
import CourseContextMenu from './course-contextmenu';
import CourseEditModal from './course-edit-modal';
import { Label } from 'semantic-ui-react';
import validatePlan from '../selectors/validatePlan';
import courseRequirementsMap from '../selectors/courseRequirementsMap';

const headerDelimiterRegex = /\s|-/;

class Course extends React.Component {
  state = { editing: null, menu: {} }

  handleChange(c) {
    if(c.header) {
      c.subject = c.header.split(headerDelimiterRegex)[0];
      c.number = c.header.split(headerDelimiterRegex)[1];
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
    return s.split(headerDelimiterRegex).length === 2;
  }

  validateCredits(s) {
    return !isNaN(s);
  }

  render() {
    const { course, color, missingPrereqs, requirements } = this.props;
    return (
      <div className={'course ' + (missingPrereqs ? 'missingPrereqs' : '')}
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

        {requirements && requirements.length > 0 ?
          <div className="course-fills-requirements">
            {(requirements || []).length}
          </div>
          : null}
      </div>
    );
  }
}

Course.propTypes = {
  course: PropTypes.object,
  missingPrereqs: PropTypes.object,
  color: PropTypes.string,
  updateCourse: PropTypes.func,
  requirements: PropTypes.array,
};

const DroppableCourse = (props) =>
  <Droppable droppableId={props.course.fid} type="COURSE-REQ">
    {(provided, snapshot) => (
      <div ref={provided.innerRef}
        className={snapshot.isDraggingOver ? 'dragging-over' : ''}>
        <Course {...props} />
        <div style={{display: 'none'}}>{provided.placeholder}</div>
      </div>
    )}
  </Droppable>
;
DroppableCourse.propTypes = { course: PropTypes.object };



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
          <DroppableCourse {...props}/>
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


class ContextMenuCourse extends React.Component {
  handleAction(e, data) {
    switch(data.action) {
    case 'delete':
      this.props.deleteCourse(this.props.course.fid);
      break;
    case 'edit':
      this.openModal();
      break;
    default:
      return;
    }
  }

  state = { modalOpen: false };
  closeModal() {
    this.setState({ modalOpen: false });
  }
  openModal() {
    this.setState({ modalOpen: true });
  }

  render() {
    return (
      <React.Fragment>
        <ContextMenuTrigger id={this.props.course.fid}>
          <DraggableCourse {...this.props}/>
        </ContextMenuTrigger>

        <CourseContextMenu id={this.props.course.fid}
          onClick={this.handleAction.bind(this)} />

        <CourseEditModal
          color={this.props.color}
          modalOpen={this.state.modalOpen}
          closeModal={this.closeModal.bind(this)}
          course={this.props.course}
          deleteCourse={this.props.deleteCourse}
          updateCourse={this.props.updateCourse}
        />
      </React.Fragment>
    );
  }
}
ContextMenuCourse.propTypes = {
  course: PropTypes.object,
  color: PropTypes.string,
  deleteCourse: PropTypes.func,
  updateCourse: PropTypes.func,
};


const CourseContainer = connect(
  (state, { course }) => ({
    course: state.plan.courses[course],
    color: state.plan.colorscheme[state.plan.courses[course].subject],
    missingPrereqs: validatePlan(state).missingPrereqs[course],
    requirements: courseRequirementsMap(state)[course],
  }),
  dispatch => ({
    updateCourse: updates => dispatch(updateCourse(updates)),
    deleteCourse: fid => dispatch(deleteItem('TERM-COURSE', fid)),
  }),
)(ContextMenuCourse);

export default CourseContainer;
