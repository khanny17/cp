import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { logout } from '../actions/auth';

const LogoutButton = ({ logout }) => (
  <Link to="/">
    <Menu.Item as="div"icon="external" name="Logout" onClick={logout} link
      style={{ height: '100%' }} />
  </Link>
);

LogoutButton.propTypes = {
  logout: PropTypes.func,
};


const LogoutButtonContainer = connect(
  state => ({}),
  dispatch => ({ logout: () => dispatch(logout()) }),
)(LogoutButton);

export default LogoutButtonContainer;
