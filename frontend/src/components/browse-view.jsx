import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMine } from '../actions/browse';
import MyHeader from './header';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';


const HiddenOpenButton = ({ onClick, planId }) => (
  <Link to={`/plan/${planId}`}
    className="show-on-hover"
  >
    <Button icon basic size="mini" style={{float: 'right'}}
      onClick={onClick}
    >
      <Icon name="folder open"/>
      Open
    </Button>
  </Link>
);
HiddenOpenButton.propTypes = { onClick: PropTypes.func, planId: PropTypes.string };

const BrowseView = ({
  my_plans, templates, loading_my_plans, loading_templates, getMine,
}) => {
  if(my_plans === null) {
    getMine();
  }

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
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {my_plans ?
                my_plans.map(plan => (
                  <Table.Row key={plan._id || plan.fid}>
                    <Table.Cell>{plan.title}</Table.Cell>
                    <Table.Cell>
                      <HiddenOpenButton planId={plan._id}/>
                    </Table.Cell>
                  </Table.Row>
                ))
                :
                <Table.Row />
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
                <Table.Row/>
              }
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    </div>
  );
};

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
