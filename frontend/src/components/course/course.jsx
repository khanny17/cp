import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import { Icon } from 'semantic-ui-react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { mouseEnterCourse, mouseLeaveCourse } from '../../actions/ui';
import validatePlan from '../../selectors/validatePlan';
import courseRequirementsMap from '../../selectors/courseRequirementsMap';
import { updateCourse } from '../../actions/plan';

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
    const { course, color, missingPrereqs, requirements,
      mouseEnterCourse, mouseLeaveCourse, openEditModal } = this.props;

    return (
      <div className={'course ' + course.subject + '-' + course.number +
        (missingPrereqs ? ' missingPrereqs ' : '')}
      style={{ background: color }}
      onKeyPress={this.handleKeyPress.bind(this)}
      onMouseEnter={() => mouseEnterCourse(course.fid)}
      onMouseLeave={() => mouseLeaveCourse(course.fid)}
      onDoubleClick={openEditModal}
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
          <Icon name="certificate" className="course-fills-requirements" />
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
  mouseEnterCourse: PropTypes.func,
  mouseLeaveCourse: PropTypes.func,
  openEditModal: PropTypes.func,
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
    mouseEnterCourse: fid => dispatch(mouseEnterCourse(fid)),
    mouseLeaveCourse: fid => dispatch(mouseLeaveCourse(fid)),
  }),
)(Course);


class DroppableCourse extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inner = this.inner.bind(this);
  }

  inner(provided, snapshot) {
    return (
      <div ref={provided.innerRef}
        className={snapshot.isDraggingOver ? 'dragging-over' : ''}>
        <CourseContainer {...this.props} />
        <div style={{display: 'none'}}>{provided.placeholder}</div>
      </div>
    );
  }

  render() {
    const { course } = this.props;
    return (
      <Droppable droppableId={course} type="COURSE-REQ">
        {this.inner}
      </Droppable>
    );
  }
}
DroppableCourse.propTypes = { course: PropTypes.string };



class DraggableCourse extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inner = this.inner.bind(this);
  }

  inner(provided, snapshot) {
    const { course, index, openEditModal } = this.props;
    return (
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
          <DroppableCourse 
            course={course}
            index={index}
            openEditModal={openEditModal}
          />
        </div>
        {provided.placeholder}
      </div>
    );
  }

  render() {
    const { index, course } = this.props;
    return (
      <Draggable draggableId={course} type="TERM-COURSE" index={index}>
        {this.inner}
      </Draggable>
    );
  }
}
DraggableCourse.propTypes = {
  course: PropTypes.string,
  index: PropTypes.number,
  openEditModal: PropTypes.func,
};

export default DraggableCourse;
