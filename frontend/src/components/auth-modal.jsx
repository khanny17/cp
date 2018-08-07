import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import '../css/auth-modal.css';

class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: this.props.login };
  }

  defaultTrigger = (<Button>Login/Register</Button>);

  render() {
    return (
      <Modal trigger={this.props.trigger || this.defaultTrigger}
        closeIcon size="mini">
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

AuthModal.propTypes = {
  login: PropTypes.bool,
  trigger: PropTypes.element,
};

export default AuthModal;
