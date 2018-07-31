import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';


const HiddenOpenButton = () => (
  <Button icon basic size="mini" style={{float: 'right'}}
    className="show-on-hover"
  >
    <Icon name="folder open"/>
    Open
  </Button>
);

const BrowseView = ({ userPlans, templates }) => (
  <Container text style={{ textAlign: 'left' }}>
    <Header as='h1' attached='top' block>
      My Plans
    </Header>
    <Segment attached>
      <Table basic="very" selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Plan Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userPlans.map(plan => (
            <Table.Row key={plan._id || plan.fid}>
              <Table.Cell>{plan.name}</Table.Cell>
              <Table.Cell>
                <HiddenOpenButton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>

    <Header as='h1' attached='top' block>
      Plan Templates
    </Header>
    <Segment attached>
      <Table basic="very" selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Plan Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {templates.map(plan => (
            <Table.Row key={plan._id || plan.fid}>
              <Table.Cell>{plan.name}</Table.Cell>
              <Table.Cell>
                <HiddenOpenButton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  </Container>
);

BrowseView.propTypes = {
  userPlans: PropTypes.array,
  templates: PropTypes.array,
};

const BrowseViewContainer = connect(
  state => ({
    userPlans: state.plan.userPlans,
    templates: state.plan.templates,
  }),
  dispatch => ({}),
)(BrowseView);

export default BrowseViewContainer;
