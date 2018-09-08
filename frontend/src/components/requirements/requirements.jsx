import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRequirement, updateRequirement } from '../../actions/plan';
import findFailingRequirements from '../../selectors/find-failing-requirements';
import { Button, Header, Icon, List } from 'semantic-ui-react';
import Requirement from './requirement';

const Requirements = ({
  requirements,
  addRequirement,
  updateRequirement,
  failingRequirements,
}) =>
  <div className="requirements-inner">
    <Header as='h1'>Requirements</Header>
    <List>
      {Object.values(requirements).map(req => (
        <List.Item key={req.fid}>
          <Requirement
            notMet={!!failingRequirements[req.fid]}
            requirement={req}
            updateRequirement={updateRequirement}
          />
        </List.Item>
      ))}
    </List>
    <Button onClick={addRequirement}>
      <Icon name="plus" />Add
    </Button>
  </div>
;
Requirements.propTypes = {
  addRequirement: PropTypes.func,
  updateRequirement: PropTypes.func,
  requirements: PropTypes.object,
  failingRequirements: PropTypes.object,
};

const RequirementsContainer = connect(
  state => ({
    requirements: state.plan.requirements,
    failingRequirements: findFailingRequirements(state),
  }),
  dispatch => ({
    addRequirement: () => dispatch(addRequirement()),
    updateRequirement: toUpdate => dispatch(updateRequirement(toUpdate)),
  }),
)(Requirements);

export default RequirementsContainer;
