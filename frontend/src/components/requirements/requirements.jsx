import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRequirement } from '../../actions/plan';
import { Button, Header, Icon, List } from 'semantic-ui-react';
import Requirement from './requirement';

const Requirements = ({ requirements, add }) =>
  <div className="requirements-inner">
    <Header as='h1'>Requirements</Header>
    <List>
      {requirements.map(id => (
        <List.Item key={id}>
          <Requirement id={id} />
        </List.Item>
      ))}
    </List>
    <Button onClick={add}>
      <Icon name="plus" />Add
    </Button>
  </div>
;
Requirements.propTypes = { requirements: PropTypes.array, add: PropTypes.func };

const RequirementsContainer = connect(
  state => ({
    requirements: state.plan.plans[state.plan.plan].requirements,
  }),
  dispatch => ({
    add: () => dispatch(addRequirement()),
  }),
)(Requirements);

export default RequirementsContainer;
