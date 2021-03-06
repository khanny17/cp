import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCourse } from '../../actions/plan';
import { Accordion, Button, Segment, Form, Grid, Modal } from 'semantic-ui-react';
import EasyInput from '../easy-input';
import { randomColors } from '../../util/colors';
import AccordionPanels from './course-edit-modal-accordion-panels';
import { deleteItem } from '../../actions/plan';
import '../../css/course-edit-modal.css';

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
          <Segment vertical>
            <Grid stackable columns="2">
              <Grid.Column width="4">
                <CoursePreview color={color} {...course} />
              </Grid.Column>
              <Grid.Column width="12">
                <Form>
                  <EasyInput name="title" value={this.state.title}
                    onChange={this.onChange.bind(this)} />
                  <Form.Group widths="equal">
                    <EasyInput name="subject" value={this.state.subject}
                      onChange={this.onChange.bind(this)} />
                    <EasyInput name="number" value={this.state.number}
                      onChange={this.onChange.bind(this)} />
                  </Form.Group>
                  <EasyInput name="credits" value={this.state.credits}
                    onChange={this.onChange.bind(this)} />
                </Form>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment vertical>
            <Accordion styled>
              <AccordionPanels
                prereqs={course.prereqs}
                attributes={course.attributes}
                color={color}
                onChange={this.onChange.bind(this)}
                onColorChange={this.onColorChange.bind(this)}
              />
            </Accordion>
          </Segment>

        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => {
            updateCourse({ color: this.state.color, ...this.state.course });
            closeModal();
          }}>
            Update
          </Button>
          <Button color='red' style={{ float: 'left' }}
            onClick={deleteCourse}>
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

const CourseEditModalContainer = connect(
  (state, { course }) => ({
    course: state.plan.courses[course],
    color: state.plan.colorscheme[state.plan.courses[course].subject],
  }),
  (dispatch, { course }) => ({
    updateCourse: updates => dispatch(updateCourse(updates)),
    deleteCourse: () => dispatch(deleteItem('TERM-COURSE', course)),
  }),
)(CourseEditModal);

export default CourseEditModalContainer;
