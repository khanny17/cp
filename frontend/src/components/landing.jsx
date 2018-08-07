import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthModal from './auth-modal';
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Segment
} from 'semantic-ui-react';
import '../css/landing.css';

const Landing = ({ user }) => (
  <Segment inverted>
    <div className="small-triangle"></div>
    <div className="big-triangle"></div>
    <div className="alpha">In Alpha</div>
    <Menu inverted size="huge" secondary>
      <Container>
        {user ?
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/browse">
                <Button size="large" inverted>Home</Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
          :
          <Menu.Menu position="right">
            <Menu.Item>
              <AuthModal login={true} trigger={
                <Button size="large" inverted style={{ marginRight: '5px' }}>
                  Login
                </Button>
              }/>
              <AuthModal login={false} trigger={
                <Button size="large" inverted color="teal">
                  Sign Up
                </Button>
              }/>
            </Menu.Item>
          </Menu.Menu>
        }
      </Container>
    </Menu>
    <Header as="h1" inverted
      style={{ fontSize: '4em', fontWeight: 'normal', marginTop: '3em', }}>
      Course Planner
    </Header>
    <Header as="h2" inverted style={{ marginBottom: '1em' }}>
      A simple app for planning out when to take your classes
    </Header>
    <Link to="/plan">
      <Button color="teal" size="huge">
        Jump Right In <Icon name="right arrow" />
      </Button>
    </Link>

  </Segment>
);

Landing.propTypes = { user: PropTypes.object };


const LandingContainer = connect(
  state => ({ user: state.auth.user }),
  dispatch => ({}),
)(Landing);

export default LandingContainer;
