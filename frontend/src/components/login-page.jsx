import React from 'react';
import LoginForm from './login-form';
import { Container, Header, Segment } from 'semantic-ui-react';

const LoginPage = () => (
  <Segment inverted>
    <Container text>
      <Segment style={{ textAlign: 'left', marginTop: '20%'}}>
        <Header as='h1'>Login</Header>
        <LoginForm />
      </Segment>
    </Container>
  </Segment>
);

export default LoginPage;
