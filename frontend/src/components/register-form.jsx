import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { register } from '../actions/auth';
import EasyInput from './easy-input';

class RegisterForm extends React.Component {
  submit() {
    this.props.register(this.state);
  }

  captchaChange(value) {
    this.setState({ 'g-recaptcha-response': value });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <Form>
        <EasyInput name="name" />
        <EasyInput name="email" type="email" />
        <EasyInput name="password" type="password" />
        <ReCAPTCHA
          sitekey="6LeLS2cUAAAAAEmuzWToCTQ0El6R9RtlpPfJ7k6f"
          onChange={this.captchaChange.bind(this)}
        />
        <Form.Group className="auth-modal-actions">
          <Form.Button primary loading={this.props.loading}
            onClick={this.submit.bind(this)}>
            Register
          </Form.Button>
          <div style={{ flex: 1 }}></div>
          <a className="button-link" onClick={() => this.props.swap()}>Login</a>
        </Form.Group>
      </Form>
    );
  }
}

RegisterForm.propTypes = {
  swap: PropTypes.func,
  register: PropTypes.func,
  loading: PropTypes.bool,
};

const RegisterFormContainer = connect(
  state => ({ loading: state.ui.requestingRegister }),
  dispatch => ({
    register: user => dispatch(register(user)),
  }),
)(RegisterForm);

export default RegisterFormContainer;
