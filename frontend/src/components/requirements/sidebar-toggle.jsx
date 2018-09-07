import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleRequirementsSidebar } from '../../actions/ui';
import { Button, Icon } from 'semantic-ui-react';

const SidebarToggle = ({ toggle }) =>
  <Button className="toggle" onClick={toggle}>
    <Icon fitted name="tasks" />
  </Button>
;
SidebarToggle.propTypes = { toggle: PropTypes.func };

const SidebarToggleContainer = connect(
  state => ({}),
  dispatch => ({
    toggle: () => dispatch(toggleRequirementsSidebar()),
  }),
)(SidebarToggle);

export default SidebarToggleContainer;
