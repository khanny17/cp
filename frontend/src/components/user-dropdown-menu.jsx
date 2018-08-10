import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, Icon } from 'semantic-ui-react';
import ProfileModal from './profile-modal';
import { logout } from '../actions/auth';


const UserDropdownMenu = ({ logout }) =>
  <Dropdown item text="User">
    <Dropdown.Menu>
      <ProfileModal />
      <Dropdown.Item onClick={logout}>
        <Icon name="sign out" />Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
;
UserDropdownMenu.propTypes = {
  logout: PropTypes.func,
};

const UserDropdownMenuContainer = connect(
  state => ({}),
  dispatch => ({ logout: () => dispatch(logout()) }),
)(UserDropdownMenu);

export default UserDropdownMenuContainer;
