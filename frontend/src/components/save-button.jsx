import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import { savePlan } from '../actions/plan-api';

const SaveButton = ({ saving, save, plan_data, match }) => {
  const p = match.params.id ?
    plan_data.plans[match.params.id] :
    plan_data.plans['new'] ;

  if(!p || p.failed) {
    return null;
  }

  return (
    <Menu.Item onClick={() => save(plan_data)}>
      { saving ? <Icon loading name="circle notch" /> : <Icon name="save"/> }
      Save
    </Menu.Item>
  );
};

SaveButton.propTypes = {
  save: PropTypes.func,
  saving: PropTypes.bool,
  plan_data: PropTypes.object,
  match: PropTypes.object,
};


const SaveButtonContainer = connect(
  state => ({ saving: state.plan.saving, plan_data: state.plan }),
  dispatch => ({ save: plan_data => dispatch(savePlan(plan_data)) }),
)(SaveButton);

export default SaveButtonContainer;
