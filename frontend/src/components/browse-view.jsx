import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMine } from '../actions/browse';
import { newPlan } from '../actions/plan-api';
import MyHeader from './header';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';
import HiddenOpenButton from './hidden-open-button';
import HiddenDeleteButton from './hidden-delete-button';

class BrowseView extends React.Component {
  state = {};

  static getDerivedStateFromProps(props) {
    if(props.my_plans === null) {
      props.getMine();
    }
    return {};
  }

  render() {
    const { my_plans, templates, loading_my_plans,
      loading_templates, newPlan } = this.props;
    return (
      <div>
        <MyHeader />
        <Container text style={{ textAlign: 'left' }}>
          <Header as='h1' attached='top' block>
            My Plans
            <Link to="/plan" onClick={newPlan}>
              <Button primary style={{ float: 'right' }}>
                <Icon name="file"/>New Plan
              </Button>
            </Link>
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
                {my_plans && my_plans.length !== 0 ?
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
                      {my_plans === null ?
                        'Unable to load plans' :
                        'No plans yet!'}
                    </Table.Cell>
                  </Table.Row>
                }
              </Table.Body>
            </Table>
          </Segment>

          <Header as='h1' attached='top' block>
            Plan Templates
          </Header>
          <Segment attached loading={loading_templates}>
            <Table basic="very" selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Plan Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {templates ?
                  templates.map(plan => (
                    <Table.Row key={plan._id || plan.fid}>
                      <Table.Cell>{plan.title}</Table.Cell>
                      <Table.Cell>
                        <HiddenOpenButton />
                      </Table.Cell>
                    </Table.Row>
                  ))
                  :
                  <Table.Row>
                    <Table.Cell style={{ textAlign: 'center' }}>
                      {templates === null ?
                        'Unable to load templates' :
                        'No templates found'}
                    </Table.Cell>
                  </Table.Row>
                }
              </Table.Body>
            </Table>
          </Segment>
        </Container>
      </div>
    );
  }
}

BrowseView.propTypes = {
  my_plans: PropTypes.array,
  templates: PropTypes.array,
  loading_my_plans: PropTypes.bool,
  loading_templates: PropTypes.bool,
  getMine: PropTypes.func,
  newPlan: PropTypes.func,
};

const BrowseViewContainer = connect(
  state => ({
    loading_my_plans: state.browse.loading_my_plans,
    my_plans: state.browse.my_plans,
    loading_templates: state.browse.loading_templates,
    templates: state.browse.templates,
  }),
  dispatch => ({
    getMine: () => dispatch(getMine()),
    newPlan: () => dispatch(newPlan()),
  }),
)(BrowseView);

export default BrowseViewContainer;
