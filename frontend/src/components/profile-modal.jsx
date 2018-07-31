import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Modal } from 'semantic-ui-react';
import { logout } from '../actions/auth';


const ProfileMenuItem = ({ user, open, logout }) => (
  <Menu.Menu>
    <Menu.Item icon="user" name={user.name || 'User'} link onClick={open} />
    <Menu.Item icon="external" name="Logout" onClick={logout} link/>
  </Menu.Menu>
);

ProfileMenuItem.propTypes = {
  user: PropTypes.object,
  open: PropTypes.func,
  logout: PropTypes.func,
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
          <ProfileMenuItem
            user={this.props.user}
            logout={this.props.logout}
            open={() => this.setState({ open: true })}
          />
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
  logout: PropTypes.func,
};

const ProfileModalContainer = connect(
  state => ({ user: state.auth.user }),
  dispatch => ({
    logout: () => dispatch(logout()),
  }),
)(ProfileModal);

export default ProfileModalContainer;
