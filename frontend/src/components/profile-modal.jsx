import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, Icon, Modal } from 'semantic-ui-react';


const ProfileMenuItem = ({ open }) => (
  <Dropdown.Item onClick={open}><Icon name="user" />Profile</Dropdown.Item>
);

ProfileMenuItem.propTypes = {
  user: PropTypes.object,
  open: PropTypes.func,
};

class ProfileModal extends React.Component {
  state = { open: false };

  render() {
    return (
      <Modal
        closeIcon
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
        trigger={
          <ProfileMenuItem open={() => this.setState({ open: true })}/>
        }
      >
        <Modal.Header>Profile</Modal.Header>
        <Modal.Content>
          <p> :p </p>
        </Modal.Content>
      </Modal>
    );
  }
}


ProfileModal.propTypes = {
  user: PropTypes.object,
};

const ProfileModalContainer = connect(
  state => ({ user: state.auth.user }),
  dispatch => ({}),
)(ProfileModal);

export default ProfileModalContainer;
