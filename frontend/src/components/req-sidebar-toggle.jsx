import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import { toggleRequirementsSidebar } from '../actions/ui';

const SaveButton = ({ toggleRequirementsSidebar, }) =>
  <Menu.Item onClick={() => toggleRequirementsSidebar()}>
    <Icon name="tasks"/>
    Requirements
  </Menu.Item>
;

SaveButton.propTypes = {
  toggleRequirementsSidebar: PropTypes.func,
};


const SaveButtonContainer = connect(
  state => ({ }),
  dispatch => ({
    toggleRequirementsSidebar: () => dispatch(toggleRequirementsSidebar()) }),
)(SaveButton);

export default SaveButtonContainer;

