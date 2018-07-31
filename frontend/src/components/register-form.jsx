import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

class RegisterForm extends React.Component {
  submit() {
    fetch('https://auth.cp-api.tech/register', {
      method: 'post',
      body: JSON.stringify(this.state),
      mode: 'no-cors'
    })
      .then(data => console.log(data)) //eslint-disable-line
  }

  captchaChange(value) {
    this.setState({ 'g-recaptcha-response': value });
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
      <div>
        <Input name="email" type="email" />
        <Input name="password" type="password" />
        <ReCAPTCHA
          sitekey="6LeLS2cUAAAAAEmuzWToCTQ0El6R9RtlpPfJ7k6f"
          onChange={this.captchaChange.bind(this)}
        />
        <button onClick={this.submit.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default RegisterForm;
