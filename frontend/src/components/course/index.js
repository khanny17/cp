import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../css/course.css';
import { deleteItem } from '../../actions/plan';
import { ContextMenuTrigger } from 'react-contextmenu';
import CourseContextMenu from './course-contextmenu';
import CourseEditModal from './course-edit-modal';
import Course from './course';


class ContextMenuCourse extends React.Component {
  state = { modalOpen: false };

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  handleAction(e, data) {
    switch(data.action) {
    case 'delete':
      this.props.deleteCourse();
      break;
    case 'edit':
      this.openModal();
      break;
    default:
      return;
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }
  openModal() {
    this.setState({ modalOpen: true });
  }

  render() {
    return (
      <React.Fragment>
        <ContextMenuTrigger id={this.props.course}>
          <Course
            index={this.props.index}
            course={this.props.course}
            openEditModal={this.openModal}
          />
        </ContextMenuTrigger>

        <CourseContextMenu id={this.props.course}
          onClick={this.handleAction} />

        <CourseEditModal
          course={this.props.course}
          modalOpen={this.state.modalOpen}
          closeModal={this.closeModal}
        />
      </React.Fragment>
    );
  }
}
ContextMenuCourse.propTypes = {
  course: PropTypes.string,
  index: PropTypes.number,
  deleteCourse: PropTypes.func,
};

const ContextMenuCourseContainer = connect(
  state => ({}),
  (dispatch, { course }) => ({
    deleteCourse: () => dispatch(deleteItem('TERM-COURSE', course)),
  }),
)(ContextMenuCourse);

export default ContextMenuCourseContainer;
