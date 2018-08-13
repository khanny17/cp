import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Segment, Table } from 'semantic-ui-react';
import HiddenOpenButton from './hidden-open-button';
import HiddenDeleteButton from './hidden-delete-button';

const MyPlans = ({ my_plans, loading_my_plans, newPlan }) =>
  <React.Fragment>
    <Header as='h1' attached='top' block>
      My Plans
      <Button primary style={{ float: 'right' }} onClick={newPlan}>
        <Icon name="file"/>New Plan
      </Button>
    </Header>
    <Segment attached loading={loading_my_plans}>
      <Table basic="very" selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Plan Name</Table.HeaderCell>
            <Table.HeaderCell>Last Accessed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {my_plans && !my_plans.error && my_plans.length !== 0 ?
            my_plans.map(plan => (
              <Table.Row key={plan._id || plan.fid}>
                <Table.Cell>{plan.title}</Table.Cell>
                <Table.Cell>
                  {new Date(plan.lastAccessed).toLocaleDateString()}
                  <HiddenDeleteButton plan={plan}/>
                  <HiddenOpenButton planId={plan._id}/>
                </Table.Cell>
              </Table.Row>
            ))
            :
            <Table.Row>
              <Table.Cell style={{ textAlign: 'center' }}>
                {my_plans === null || my_plans.error ?
                  'Unable to load plans' :
                  'No plans yet!'}
              </Table.Cell>
            </Table.Row>
          }
        </Table.Body>
      </Table>
    </Segment>
  </React.Fragment>
;

MyPlans.propTypes = {
  my_plans: PropTypes.array,
  loading_my_plans: PropTypes.bool,
  newPlan: PropTypes.func,
};

export default MyPlans;
