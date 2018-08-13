import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMine, templates, } from '../actions/browse';
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
import '../css/browse-view.css';

class BrowseView extends React.Component {
  state = {};

  handleMyPlans() {
    if(this.props.my_plans === null) {
      this.props.getMine();
    }
  }

  handleTemplates() {
    if(this.props.templates === null) {
      this.props.getTemplates();
    }
  }

  componentDidMount() {
    this.handleMyPlans();
    this.handleTemplates();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.my_plans !== prevProps.my_plans) {
      this.handleMyPlans();
    }

    if(this.props.templates !== prevProps.templates) {
      this.handleTemplates();
    }
  }


  render() {
    const { my_plans, templates, loading_my_plans,
      loadingTemplates, newPlan } = this.props;
    return (
      <div>
        <MyHeader />
        <Container text style={{ textAlign: 'left' }}>
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

          <Header as='h1' attached='top' block>
            Plan Templates
          </Header>
          <Segment attached loading={loadingTemplates}>
            <Table basic="very" selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Plan Name</Table.HeaderCell>
                  <Table.HeaderCell collapsing>Stars</Table.HeaderCell>
                  <Table.HeaderCell>Tags</Table.HeaderCell>
                  <Table.HeaderCell/>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {templates && !templates.error ?
                  templates.map(template => (
                    <Table.Row key={template._id}>
                      <Table.Cell>{template.plan.details.title}</Table.Cell>
                      <Table.Cell collapsing>
                        {template.stars.length}
                        <Icon name="star outline" className="star"/>
                      </Table.Cell>
                      <Table.Cell>{template.tags}</Table.Cell>
                      <Table.Cell>
                        <Button icon inverted color="blue" size="mini"
                          className="show-on-hover" style={{float: 'right'}}>
                          <Icon name="copy"/>Preview
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                  :
                  <Table.Row>
                    <Table.Cell style={{ textAlign: 'center' }}>
                      {templates === null || templates.error ?
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
  templates: PropTypes.any,
  loading_my_plans: PropTypes.bool,
  loadingTemplates: PropTypes.bool,
  getMine: PropTypes.func,
  getTemplates: PropTypes.func,
  newPlan: PropTypes.func,
};

const BrowseViewContainer = connect(
  state => ({
    loading_my_plans: state.browse.loading_my_plans,
    my_plans: state.browse.my_plans,
    loadingTemplates: state.browse.loadingTemplates,
    templates: state.browse.templates,
  }),
  dispatch => ({
    getTemplates: () => dispatch(templates()),
    getMine: () => dispatch(getMine()),
    newPlan: () => dispatch(newPlan()),
  }),
)(BrowseView);

export default BrowseViewContainer;
