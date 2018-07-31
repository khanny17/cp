import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class LoginForm extends React.Component {
  submit() {
    fetch('https://auth.cp-api.tech/login', {
      method: 'post',
      body: JSON.stringify(this.state),
      mode: 'no-cors'
    })
      .then(data => console.log(data)) //eslint-disable-line
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
          <Form.Button primary onClick={this.submit.bind(this)}>
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
};

export default LoginForm;
