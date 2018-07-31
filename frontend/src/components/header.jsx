import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import AuthModal from './auth-modal';
import ProfileModal from './profile-modal';


const logoStyle = {
  fontSize: '1.5rem',
  padding: '0.9rem',
  marginTop: '-0.3rem',
};

const Header = ({ user }) => (
  <Menu inverted style={{ borderRadius: 0 }}>
    <Menu.Item header style={logoStyle}>cp</Menu.Item>
    <div style={{ flex: 1 }} />
    {user ?
      <ProfileModal /> :
      <Menu.Item>
        <AuthModal />
      </Menu.Item>
    }
  </Menu>
);

Header.propTypes = {
  user: PropTypes.object,
};

const HeaderContainer = connect(
  state => ({ user: state.auth.user }),
  dispatch => ({}),
)(Header);

export default HeaderContainer;
