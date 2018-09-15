import React from 'react';
import PropTypes from 'prop-types';
import POL from './pull-on-load';
import { getMine } from '../actions/browse';
import { connect } from 'react-redux';
import { Button, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { newPlan } from '../actions/plan-api';
import HiddenOpenButton from './hidden-open-button';
import HiddenDeleteButton from './hidden-delete-button';


const MyPlans = ({ plans, newPlan }) =>
  <React.Fragment>
    <Header as='h1' attached='top' block>
      My Plans
      <Button primary style={{ float: 'right' }} onClick={newPlan}>
        <Icon name="file"/>New Plan
      </Button>
    </Header>
    <Segment attached loading={plans.loading}>
      <Table basic="very" selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Plan Name</Table.HeaderCell>
            <Table.HeaderCell>Last Accessed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {plans.loading || plans.error || (plans.data || []).length === 0 ?
            <Table.Row>
              <Table.Cell style={{ textAlign: 'center' }}>
                {plans.loading ?  'Loading Plans' :
                  plans.error ?  'Error while loading plans' :
                    (plans.data || []).length === 0 ? 'No plans yet' : null }
              </Table.Cell>
            </Table.Row>
            :
            plans.data.map(plan => (
              <Table.Row key={plan._id || plan.fid}>
                <Table.Cell>{plan.title}</Table.Cell>
                <Table.Cell>
                  {new Date(plan.lastAccessed).toLocaleDateString()}
                  <HiddenDeleteButton plan={plan}/>
                  <HiddenOpenButton planId={plan._id}/>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </Segment>
  </React.Fragment>
;
MyPlans.propTypes = {
  plans: PropTypes.object,
  newPlan: PropTypes.func,
};

const MyPlansPOL = (props) =>
  <POL info={props.plans} pull={props.getMine}>
    <MyPlans {...props} />
  </POL>
;
MyPlansPOL.propTypes = {
  plans: PropTypes.object,
  getMine: PropTypes.func,
};



const MyPlansContainer = connect(
  state => ({
    plans: state.browse.my_plans,
  }),
  dispatch => ({
    getMine: () => dispatch(getMine()),
    newPlan: () => dispatch(newPlan()),
  }),
)(MyPlansPOL);


export default MyPlansContainer;
