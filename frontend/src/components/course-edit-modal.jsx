import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Form, List, Modal } from 'semantic-ui-react';
import EasyInput from './easy-input';
import { CirclePicker } from 'react-color';
import { randomColors } from '../util/colors';

class PrereqList extends React.Component {
  state = {};

  onFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  addPrereq() {
    const { subject, number } = this.state;
    if(!subject || !number) {
      return; //TODO error handling 
    }

    this.props.onChange({
      target: {
        name: 'prereqs',
        value: this.props.prereqs.concat({ subject, number }),
      },
    });
  }

  render() {
    const { prereqs } = this.props;
    return (
      <div>
        <EasyInput name="subject" onChange={this.onFormChange.bind(this)} />
        <EasyInput name="number" onChange={this.onFormChange.bind(this)} />
        <Button primary onClick={this.addPrereq.bind(this)}>Add</Button>
        <List>
          {prereqs.map((prereq,i) =>
            <List.Item key={i}>
              {prereq.subject + ' ' + prereq.number}
            </List.Item>
          )}
        </List>
      </div>
    );
  }
}
PrereqList.propTypes = { onChange: PropTypes.func, prereqs: PropTypes.array };

const accordionPanels = ({ prereqs, onChange, color, colorOptions, onColorChange }) => [
  {
    key: 'Advanced',
    title: 'Prerequisites, Attributes',
    content: { content: (
      <div>
        <PrereqList prereqs={prereqs || []} onChange={onChange} />
      </div>
    )},
  },
  {
    key: 'colorscheme',
    title: 'Colorscheme',
    content: { content: (
      <div>
        <CirclePicker color={color} onChange={onColorChange} 
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
      ...this.state,
      course: {
        ...this.state.course,
        [event.target.name]: event.target.value,
      },
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
              prereqs: course.prereqs,
              color,
              onChange: this.onChange.bind(this),
              onColorChange: this.onColorChange.bind(this),
            })}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => updateCourse({
            color: this.state.color,
            ...this.state.course,
          })}>
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
