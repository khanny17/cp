import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { login } from '../actions/auth';

class LoginForm extends React.Component {
  submit() {
    this.props.login(this.state);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  EasyInput = ({ name, type='input' }) => (
    <Form.Input
      label={name}
      name={name}
      type={type}
      placeholder={name}
      onChange={e => this.onChange(e)}
    />
  );

  render() {
    const EasyInput = this.EasyInput;
    return (
      <Form>
        <EasyInput name="email" type="email" />
        <EasyInput name="password" type="password" />

        <Form.Group className="auth-modal-actions">
          <Form.Button primary loading={this.props.loading}
            onClick={this.submit.bind(this)}>
            Login
          </Form.Button>
          <div style={{ flex: 1 }}></div>
          <a className="button-link" onClick={() => this.props.swap()}>
            Register
          </a>
        </Form.Group>

      </Form>
    );
  }
}

LoginForm.propTypes = {
  swap: PropTypes.func,
  login: PropTypes.func,
  loading: PropTypes.bool,
};

const LoginFormContainer = connect(
  state => ({ loading: state.ui.requestingLogin }),
  dispatch => ({
    login: user => dispatch(login(user)),
  }),
)(LoginForm);


export default LoginFormContainer;
