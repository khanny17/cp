import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Dropdown,
  Form,
  Icon,
  Modal,
  Segment,
  TextArea
} from 'semantic-ui-react';
import POL from './pull-on-load';
import { getTags, publish } from '../actions/template';
import { getPrefs } from '../actions/preferences';
import SchoolSelectionDropdown from './school-selection-dropdown';
import TagSelectionDropdown from './tag-selection-dropdown';
import EasyInput from './easy-input';

const description_description =
  'Description - any info that might help explain about this plan';

class PublishModal extends React.Component {
  state = {
    modalOpen: false,
    template: {}
  };

  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.publish = this.publish.bind(this);
    this.validate = this.validate.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onSchoolChange = this.onSchoolChange.bind(this);
    this.onMajorChange = this.onMajorChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
  }

  validate() {
    const { description, school, major, tags } = this.state;
    if(!description || description.length === 0) {
      return false;
    }

    if(!school || !major || !tags) {
      return false;
    }

    return true;
  }

  publish() {
    if(!this.validate) {
      return;
    }

    this.props.publishTemplate(this.state.template, this.props.plan);
  }

  onDescriptionChange(e, data) {
    if(data.value === this.state.description) {
      return;
    }
    this.setState({ template: { ...this.state.template, description: data.value } });
  }

  onSchoolChange(e, data) {
    if(data.value === this.state.school) {
      return;
    }
    this.setState({ template: { ...this.state.template, school: data.value }});
  }

  onMajorChange(e, data) {
    if(data.value === this.state.major) {
      return;
    }
    this.setState({ template: { ...this.state.template, major: data.value }});
  }

  onTagChange(e, data) {
    if(data.value === this.state.tags) {
      return;
    }
    this.setState({ template: { ...this.state.template, tags: data.value }});
  }

  openModal() { return this.setState({ modalOpen: true }); }
  closeModal() { return this.setState({ modalOpen: false }); }

  render() {
    const { preferences, getPrefs } = this.props;
    return (
      <Modal open={this.state.modalOpen} onClose={this.closeModal}
        trigger={
          <Dropdown.Item onClick={this.openModal}>
            <Icon name="clone"/>Publish
          </Dropdown.Item>
        }
      >
        <Modal.Header>Publish Template</Modal.Header>
        <Modal.Content>
          <Segment>
            Before publishing your plan, please fill out some information to help
            others find your template.
          </Segment>

          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <label>School</label>
                <POL info={preferences} pull={getPrefs}>
                  <SchoolSelectionDropdown
                    school={(preferences.data || {}).school}
                    onChange={this.onSchoolChange}/>
                </POL>
              </Form.Field>
              <EasyInput name="major" onChange={this.onMajorChange}/>
              <Form.Field>
                <label>Tags</label>
                <TagSelectionDropdown onChange={this.onTagChange}/>
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <label>Description</label>
              <TextArea
                onChange={this.onDescriptionChange}
                placeholder={description_description} />
            </Form.Field>
          </Form>

        </Modal.Content>

        <Modal.Actions>
          <Button onClick={this.closeModal}>
            Cancel
          </Button>
          <Button primary onClick={() => {
            this.publish();
            this.closeModal();
          }}>
            Publish
          </Button>
        </Modal.Actions>
      </Modal>

    );
  }
}
PublishModal.propTypes = {
  plan: PropTypes.object,
  tags: PropTypes.array,
  getTags: PropTypes.func,
  publishTemplate: PropTypes.func,
  preferences: PropTypes.object,
  getPrefs: PropTypes.func,
};

const PublishModalContainer = connect(
  state => ({
    tags: state.template.tags,
    plan: state.plan,
    preferences: state.preferences,
  }),
  dispatch => ({
    getTags: () => dispatch(getTags()),
    publishTemplate: (template, plan) => dispatch(publish(template, plan)),
    getPrefs: () => dispatch(getPrefs()),
  }),
)(PublishModal);

export default PublishModalContainer;
