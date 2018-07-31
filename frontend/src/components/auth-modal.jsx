import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import '../css/auth-modal.css';

class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: true };
  }

  render() {
    return (
      <Modal trigger={<Button>Login/Register</Button>} closeIcon size="mini">
        <Modal.Header>{this.state.login ? 'Login' : 'Register'}</Modal.Header>
        <Modal.Content>
          {this.state.login ?
            <LoginForm swap={() => this.setState({ login: false })}/> :
            <RegisterForm swap={() => this.setState({ login: true })}/>
          }
        </Modal.Content>
      </Modal>
    );
  }
}

export default AuthModal;
