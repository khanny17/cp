import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRequirement } from '../../actions/plan';
import { Button, Header, Icon, List } from 'semantic-ui-react';
import Requirement from './requirement';

const ReqList = ({ requirements }) => requirements.map(id => (
  <List.Item key={id}>
    <Requirement id={id} />
  </List.Item>
));
ReqList.propTypes = { requirements: PropTypes.array };

const ReqListContainer = connect(
  state => ({
    requirements: state.plan.plans[state.plan.plan].requirements,
  }),
  dispatch => ({}),
)(ReqList);


const Requirements = ({ add }) =>
  <div className="requirements-inner">
    <Header as='h1'>Requirements</Header>
    <List>
      <ReqListContainer />
    </List>
    <Button onClick={add}>
      <Icon name="plus" />Add
    </Button>
  </div>
;
Requirements.propTypes = { add: PropTypes.func };

const RequirementsContainer = connect(
  state => ({}),
  dispatch => ({
    add: () => dispatch(addRequirement()),
  }),
)(Requirements);

export default RequirementsContainer;
