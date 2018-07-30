import React from 'react';
import Recaptcha from './recaptcha';


class LoginForm extends React.Component {
  submit() {
    grecaptcha.execute(); //eslint-disable-line
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  Input = ({ name, type='input' }) => (
    <input name={name} type={type} onChange={e => this.onChange(e)}
      placeholder={name}/>
  );

  render() {
    const Input = this.Input;
    return (
      <form>
        <Input name="email" type="email" />
        <Input name="password" type="password" />
        <Recaptcha siteKey="6LeLS2cUAAAAAEmuzWToCTQ0El6R9RtlpPfJ7k6f" />
        <button onClick={() => this.submit()}>Submit</button>
      </form>
    );
  }
}

export default LoginForm;
