import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

const Private = ({ user, children }) => {
  return user ? children : <Redirect to="/" /> ;
};

Private.propTypes = {
  user: PropTypes.object,
  children: PropTypes.any
};

const PrivateContainer = connect(
  state => ({ user: state.auth.user }),
  dispatch => ({}),
)(withRouter(Private));

export default PrivateContainer;
