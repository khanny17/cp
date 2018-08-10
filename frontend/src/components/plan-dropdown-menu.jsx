import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, Icon } from 'semantic-ui-react';
import { newPlan } from '../actions/plan-api';
import PublishModal from './publish-modal';

const PlanDropdownMenu = ({ newPlan }) =>
  <Dropdown item text="Plan">
    <Dropdown.Menu>
      <Dropdown.Item onClick={newPlan}>
        <Icon name="file"/>New
      </Dropdown.Item>
      <PublishModal />
    </Dropdown.Menu>
  </Dropdown>
;
PlanDropdownMenu.propTypes = {
  newPlan: PropTypes.func,
};

const PlanDropdownMenuContainer = connect(
  state => ({}),
  dispatch => ({
    newPlan: () => dispatch(newPlan()),
  }),
)(PlanDropdownMenu);

export default PlanDropdownMenuContainer;
