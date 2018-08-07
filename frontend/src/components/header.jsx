import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
import AuthModal from './auth-modal';
import ProfileModal from './profile-modal';
import LogoutButton from './logout-button';
import SaveButton from './save-button';
import { newPlan } from '../actions/plan-api';

const logoStyle = {
  fontSize: '1.5rem',
  padding: '0.9rem',
  marginTop: '-0.3rem',
};

const Header = ({ user, newPlan }) => (
  <Menu inverted style={{ borderRadius: 0 }}>
    <Menu.Item header style={logoStyle}>
      { user ?
        <Link to="/browse">cp</Link> :
        <Link to="/">cp</Link> }
    </Menu.Item>
    <Menu.Item>
      <Link to="/plan" onClick={newPlan}><Icon name="file"/>New Plan</Link>
    </Menu.Item>
    <div style={{ flex: 1 }} />
    {user ?
      <Menu.Menu>
        <Route exact path="/plan/:id?" component={SaveButton} />
        <ProfileModal />
        <LogoutButton />
      </Menu.Menu>

      :

      <Menu.Item>
        <AuthModal login={true}/>
      </Menu.Item>
    }
  </Menu>
);

Header.propTypes = {
  user: PropTypes.object,
  newPlan: PropTypes.func,
};

const HeaderContainer = withRouter(connect(
  state => ({ user: state.auth.user }),
  dispatch => ({
    newPlan: () => dispatch(newPlan()),
  }),
)(Header));

export default HeaderContainer;
