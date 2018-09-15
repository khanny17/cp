import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Dropdown,
  Grid,
  Icon,
  Menu,
  Modal,
  Segment,
} from 'semantic-ui-react';
import Account from './account';
import Preferences from './preferences';

class Content extends React.Component {
  state = { activeItem: 'account' };

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item name='account' active={activeItem === 'account'}
              onClick={this.handleItemClick.bind(this)} />
            <Menu.Item name='preferences' active={activeItem === 'preferences'}
              onClick={this.handleItemClick.bind(this)} />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {activeItem === 'account' ? <Account /> : null}
            {activeItem === 'preferences' ? <Preferences /> : null}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const ProfileMenuItem = ({ open }) => (
  <Dropdown.Item onClick={open}><Icon name="user" />Profile</Dropdown.Item>
);

ProfileMenuItem.propTypes = {
  user: PropTypes.object,
  open: PropTypes.func,
};

class ProfileModal extends React.Component {
  state = { open: false };

  render() {
    return (
      <Modal
        closeIcon
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
        trigger={
          <ProfileMenuItem open={() => this.setState({ open: true })}/>
        }
      >
        <Modal.Header>Profile</Modal.Header>
        <Modal.Content>
          <Content />
        </Modal.Content>
      </Modal>
    );
  }
}


ProfileModal.propTypes = {
  user: PropTypes.object,
};

const ProfileModalContainer = connect(
  state => ({ user: state.auth.user }),
  dispatch => ({}),
)(ProfileModal);

export default ProfileModalContainer;
