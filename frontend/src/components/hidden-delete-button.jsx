import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { deletePlan } from '../actions/plan-api';

class HiddenDeleteButton extends React.Component {
  state = { modalOpen: false };

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  deletePlanAndCloseModal() {
    this.props.deletePlan(this.props.plan._id);
    this.closeModal();
  }

  render() {
    return (
      <Modal trigger={
        <Button inverted size="mini" style={{float: 'right'}}
          className="show-on-hover" color="red"
          onClick={this.openModal.bind(this)}
        >
          <Icon name="delete" color="red"/>
          Delete
        </Button>}
      open={this.state.modalOpen}
      onClose={this.closeModal.bind(this)}
      basic size="small" style={{ textAlign: 'center' }}>
        <Header icon="delete" content="Delete This Plan?" />
        <Modal.Actions>
          <Button inverted basic onClick={this.closeModal.bind(this)}>
            Cancel
          </Button>
          <Button inverted color="red"
            onClick={this.deletePlanAndCloseModal.bind(this)}>
            <Icon name="delete" /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

HiddenDeleteButton.propTypes = {
  plan: PropTypes.object,
  deletePlan: PropTypes.func,
};

const HiddenDeleteButtonContainer = connect(
  state => ({}),
  dispatch => ({
    deletePlan: id => dispatch(deletePlan(id)),
  }),
)(HiddenDeleteButton);


export default HiddenDeleteButtonContainer;
