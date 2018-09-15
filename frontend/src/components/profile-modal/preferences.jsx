import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Dimmer,
  Header,
  Loader,
} from 'semantic-ui-react';

import POL from '../pull-on-load';
import SchoolSelectionDropdown from '../school-selection-dropdown';
import { getPrefs, setPrefs } from '../../actions/preferences';

class Preferences extends React.Component {
  state = {};

  onChange(update) {
    this.setState({ [update.name]: update.value });
  }
  onSchoolChange(e, data) {
    this.onChange({ name: 'school', value: data.value });
  }

  set() {
    this.props.set(this.state);
  }

  componentDidMount() {
    this.setState({ ...this.props.preferences.data });
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.preferences !== this.props.preferences) {
      this.setState({ ...this.props.preferences.data });
    }
  }

  render() {
    const { loading } = this.props.preferences;
    const { school } = this.state;
    return (
      <React.Fragment>
        <Header>Preferences</Header>
        {loading ?
          <Dimmer active inverted><Loader/></Dimmer>
          :
          <React.Fragment>
            <SchoolSelectionDropdown school={school}
              onChange={this.onSchoolChange.bind(this)}/>
            <Button onClick={this.set.bind(this)}>Submit</Button>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
Preferences.propTypes = {
  preferences: PropTypes.object,
  set: PropTypes.func,
};

const PreferencesPOL = (props) =>
  <POL info={props.preferences} pull={props.get}>
    <Preferences {...props} />
  </POL>
;
PreferencesPOL.propTypes = {
  preferences: PropTypes.object,
  get: PropTypes.func,
};

const PreferencesContainer = connect(
  state => ({ preferences: state.preferences }),
  dispatch => ({
    set: data => dispatch(setPrefs(data)),
    get: () => dispatch(getPrefs()),
  }),
)(PreferencesPOL);


export default PreferencesContainer;
