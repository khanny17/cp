import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthModal from '../components/auth-modal';
import { newPlan } from '../actions/plan-api';
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Menu,
  Responsive,
  Segment,
} from 'semantic-ui-react';
import '../css/landing.css';


const Landing = () =>
  <Responsive className="landing">
    <Heading />
    <Body />
    <Footing />
  </Responsive>
;


const Heading = connect(
  () => ({}),
  dispatch => ({ newPlan: () => dispatch(newPlan()) }),
)(({ newPlan }) =>
  <Segment inverted vertical className="landing-heading">
    <HeadingMenu />
    <Container text style={{textAlign:'center', paddingTop: '110px', paddingBottom: '40px'}}>

      <Header as="h2" inverted content="Simplify your college coursework planning with"
        style={{fontWeight: 'normal', marginBottom: 0}} />

      <Header as="h1" inverted content="Course Planner"
        style={{fontFamily: 'Righteous', fontSize: '4rem', fontWeight: 'normal',
          marginTop: 0}} />

      <Button inverted color="blue" size="large" style={{marginBottom: '75px'}}
        onClick={newPlan} animated>
        <Button.Content visible>
          Jump Right In
        </Button.Content>
        <Button.Content hidden>
          <Icon name="right arrow" />
        </Button.Content>
      </Button>

      <Header as="h3" inverted content="Another tagline that I can't think of right now!" 
        style={{fontWeight: 'normal'}}/>

    </Container>
  </Segment>
);

const HeadingMenu = connect(state => ({ user: state.auth.user }), () => ({}))(
  ({ user }) =>
    <Menu inverted secondary>
      <Container>
        {user ?
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/home">
                <Button inverted>Home</Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
          :
          <Menu.Menu position="right">
            <Menu.Item>
              <AuthModal login={false} trigger={
                <Button inverted color="blue" style={{ marginRight: '5px' }}>
                  Sign Up
                </Button>
              }/>
              <AuthModal login={true} trigger={
                <Button inverted>
                  Login
                </Button>
              }/>
            </Menu.Item>
          </Menu.Menu>
        }
      </Container>
    </Menu>
);

const Body = () =>
  <Segment vertical>
    <div className="triangle-pointer" />
    <Container text>
      <Header as="h3" content="How it Works"
        style={{textAlign: 'center', margin: '50px 0'}}/>

      <Container className="section">
        <Image src="/static/placeholder_image.png" style={{ width: '150px', height: '150px', marginRight: '15px'}}/>
        <div>
          <Header as="h3" color="blue" content="Download a template from your program at your school" />
          <p>Course Planner is full of pre-made plans and templates from your school and peers. These include your program requirements built right in. If your school or program does not exist here yet, you can build one from scratch and add it to our collection.</p>
        </div>
      </Container>

      <Container className="section">
        <div>
          <Header as="h3" color="blue" content="Drag and drop courses to plan which semester to take them" />
          <p>Choose which semester is right for each course. Only offered in the Fall? Easily choose a fall semester to add the course to! Going on co-op in your third year? Collapse the semester to show no classes! Customize the plan to your needs and goals</p>
        </div>
        <Image src="/static/placeholder_image.png" style={{ width: '150px', height: '150px', marginLeft: '15px'}}/>
      </Container>

      <Container className="section">
        <div>
          <Header as="h3" color="blue" content="Check your requirements to make sure it is all covered" />
          <p>Use the requirements menu to glance over everything you need, what is accounted for, and what still needs to be added.</p>
        </div>
      </Container>

      <Container className="section">
        <div>
          <Header as="h3" color="blue" content="Adapt your plan as you go" />
          <p>When you finish a class, mark it as complete. If a class gets cancelled, move it to a new spot. If you add a minor, add in the requirements you need. The Course Planner is flexible to you and your experience throughout your whole college career.</p>
        </div>
      </Container>

    </Container>
  </Segment>
;

const Footing = () =>
  <Segment inverted vertical>
    <Container>
      Footing
    </Container>
  </Segment>
;



export default Landing;
