import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Dropdown,
  Form,
  Icon,
  Modal,
  TextArea
} from 'semantic-ui-react';
import { getTags, publish } from '../actions/template';
import SchoolSelectionDropdown from './school-selection-dropdown';
import TagSelectionDropdown from './tag-selection-dropdown';

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
    this.onTagChange = this.onTagChange.bind(this);
  }

  validate() {
    if(!this.state.template.description ||
      this.state.template.description.length === 0) {
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
    this.setState({
      template: {
        ...this.state.template,
        description: data.value,
      },
    });
  }

  onSchoolChange(e, data) {
    this.setState({ template: { ...this.state.template, school: data.value }});
  }

  onTagChange(e, data) {
    this.setState({ template: { ...this.state.template, tags: data.value }});
  }

  openModal() { return this.setState({ modalOpen: true }); }
  closeModal() { return this.setState({ modalOpen: false }); }

  render() {
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
          Before publishing your plan, please fill out some information to help
          others find your template.

          <Form>
            <TextArea
              onChange={this.onDescriptionChange}
              placeholder={description_description} />

            <SchoolSelectionDropdown onChange={this.onSchoolChange}/>
            <TagSelectionDropdown onChange={this.onTagChange}/>

          </Form>

        </Modal.Content>

        <Modal.Actions>
          <Button onClick={this.closeModal}>
            Cancel
          </Button>
          <Button primary onClick={this.publish}>
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
};

const PublishModalContainer = connect(
  state => ({
    tags: state.template.tags,
    plan: state.plan,
  }),
  dispatch => ({
    getTags: () => dispatch(getTags()),
    publishTemplate: (template, plan) => dispatch(publish(template, plan)),
  }),
)(PublishModal);

export default PublishModalContainer;
