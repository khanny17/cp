import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'semantic-ui-react';
import EasyInput from './easy-input';


const CoursePreview = ({ color, subject, number, title, credits }) =>
  <div className="course" style={{ background: color }}>
    <span className="course-header">
      { subject + ' ' + number }
    </span>
    <span className="course-title">
      { title }
    </span>
    <div style={{ flex: 1 }} />
    <span className="course-credits">
      { credits }
    </span>
  </div>
;
CoursePreview.propTypes = {
  color: PropTypes.string,
  subject: PropTypes.string,
  number: PropTypes.string,
  title: PropTypes.string,
  credits: PropTypes.any,
};

class CourseEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.course };
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { modalOpen, closeModal, course,
      deleteCourse, updateCourse } = this.props;
    return (
      <Modal open={modalOpen} onClose={closeModal} size="tiny" closeIcon>
        <Modal.Header>Edit Course</Modal.Header>
        <Modal.Content style={{ display: 'flex' }}>
          <CoursePreview color={this.props.color} {...course} />
          <Form style={{ flex: 1, marginLeft: '25px' }}>
            <EasyInput name="title" value={this.state.title}
              onChange={this.onChange.bind(this)} />
            <EasyInput name="subject" value={this.state.subject}
              onChange={this.onChange.bind(this)} />
            <EasyInput name="number" value={this.state.number}
              onChange={this.onChange.bind(this)} />
            <EasyInput name="credits" value={this.state.credits}
              onChange={this.onChange.bind(this)} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => updateCourse(this.state)}>
            Update
          </Button>
          <Button color='red' style={{ float: 'left' }}
            onClick={() => deleteCourse(course.fid)}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

CourseEditModal.propTypes = {
  modalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  course: PropTypes.object,
  color: PropTypes.string,
  deleteCourse: PropTypes.func,
  updateCourse: PropTypes.func,
};

export default CourseEditModal;
