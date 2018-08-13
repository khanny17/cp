import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Form, Modal } from 'semantic-ui-react';
import EasyInput from './easy-input';
import { CirclePicker } from 'react-color';
import { randomColors } from '../util/colors';

const accordionPanels = ({ color, colorOptions, onChange }) => [
  {
    key: 'Advanced',
    title: 'Prerequisites, Attributes',
    content: { content: (
      <div>oop</div>
    )},
  },
  {
    key: 'colorscheme',
    title: 'Colorscheme',
    content: { content: (
      <div>
        <CirclePicker color={color} onChange={onChange} 
          colors={colorOptions}
        />
      </div>
    )},
  },
];


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
    this.state = { course: props.course, ...props.course };
  }

  componentDidMount() {
    this.setState({
      color: this.props.color,
      colorOptions: [this.props.color, ...randomColors(17)],
      ...this.props.course,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    let update = false;
    let newState = {...this.props.course};

    if(prevProps.color !== this.props.color ||
      prevProps.course !== this.props.course) {

      newState.color = this.props.color;
      newState.course = this.props.course;
      update = true;
    }
    if(!this.state.colorOptions.includes(this.props.color)) {
      newState.colorOptions = [this.props.color, ...randomColors(17)];
      update = true;
    }

    if(update) {
      this.setState(newState);
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onColorChange(color, event) {
    this.setState({ color: color.hex });
  }

  render() {
    const { modalOpen, closeModal,
      deleteCourse, updateCourse } = this.props;
    const { color, course } = this.state;

    return (
      <Modal open={modalOpen} onClose={closeModal} size="tiny" closeIcon>
        <Modal.Header>Edit Course</Modal.Header>
        <Modal.Content>
          <div style={{ display: 'flex', marginBottom: '15px' }}>
            <CoursePreview color={color} {...course} />
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
          </div>
          <Accordion styled 
            panels={accordionPanels({
              color,
              onChange: this.onColorChange.bind(this),
            })}
          />
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
