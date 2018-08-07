import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMine } from '../actions/browse';
import MyHeader from './header';
import {
  Container,
  Header,
  Segment,
  Table,
} from 'semantic-ui-react';
import HiddenOpenButton from './hidden-open-button';
import HiddenDeleteButton from './hidden-delete-button';

class BrowseView extends React.Component {
  componentDidMount() {
    if(this.props.my_plans === null) {
      this.props.getMine();
    }
  }

  render() {
    const { my_plans, templates, loading_my_plans,
      loading_templates } = this.props;
    return (
      <div>
        <MyHeader />
        <Container text style={{ textAlign: 'left' }}>
          <Header as='h1' attached='top' block>
            My Plans
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
  }),
)(BrowseView);

export default BrowseViewContainer;
