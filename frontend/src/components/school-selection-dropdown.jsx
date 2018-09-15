import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { getSchools } from '../actions/school';
import POL from './pull-on-load';

class SchoolSelectionDropdown extends React.PureComponent {
  state = { schoolOptions: null, searchQuery: '' };

  onSearchChange(e, data) {
    this.setState({ searchQuery: data.searchQuery });
  }

  handleSchoolOptions() {
    const { data, loading, error } = this.props.schools;
    if(!data || loading || error) {
      return;
    }

    const q = this.state.searchQuery.toLowerCase();
    const qRegex = new RegExp(q, 'i');
    const filtered = Object.values(data).filter(s => {
      return qRegex.test(s.name) || qRegex.test(s.aliases);
    });
    const sliced = filtered.slice(0, 100);

    // Make sure the chosen school is an option
    if(this.props.school && !sliced.find(s => s._id === this.props.school)) {
      sliced.push(data[this.props.school]);
    }

    this.setState({ schoolOptions: sliced.map(s => ({
      key: s._id, value: s._id, text: s.name,
    }))});
  }

  componentDidMount() {
    this.handleSchoolOptions();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.schools.data !== prevProps.schools.data ||
       this.state.searchQuery !== prevState.searchQuery ||
       this.props.school !== prevProps.school) {
      this.handleSchoolOptions();
    }
  }

  render() {
    const { onChange, school } = this.props;
    const { schoolOptions } = this.state;
    return (
      <Dropdown search selection placeholder="School"
        onChange={onChange}
        onSearchChange={this.onSearchChange.bind(this)}
        options={schoolOptions}
        value={school}
      />
    );
  }
}
SchoolSelectionDropdown.propTypes = {
  school: PropTypes.string,
  schools: PropTypes.object,
  getSchools: PropTypes.func,
  onChange: PropTypes.func,
};

const SchoolSelectionDropdownPOL = (props) =>
  <POL info={props.schools} pull={props.getSchools}>
    <SchoolSelectionDropdown {...props} />
  </POL>
;
SchoolSelectionDropdownPOL.propTypes = {
  schools: PropTypes.object,
  getSchools: PropTypes.func,
};


const SchoolSelectionDropdownContainer = connect(
  state => ({
    schools: state.school,
  }),
  dispatch => ({
    getSchools: () => dispatch(getSchools()),
  }),
)(SchoolSelectionDropdownPOL);

export default SchoolSelectionDropdownContainer;
