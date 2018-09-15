import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Header,
} from 'semantic-ui-react';
import EasyInput from '../easy-input';

class Account extends React.Component {
  state = {};

  onChange(update) {
    this.setState({ [update.name]: update.value });
  }

  render() {
    return (
      <React.Fragment>
        <Header>Account</Header>
        <Form>
          <EasyInput name="name" value={this.props.name}
            onChange={this.onChange.bind(this)}/>
          <EasyInput name="email" type="email" value={this.props.email}
            onChange={this.onChange.bind(this)}/>
          <Button type='submit'>Submit</Button>
        </Form>
      </React.Fragment>
    );
  }
}
Account.propTypes = { name: PropTypes.string, email: PropTypes.string };

const AccountContainer = connect(
  state => ({ name: state.auth.user.name, email: state.auth.user.email }),
  dispatch => null,
)(Account);

export default AccountContainer;
