import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { getSchools } from '../actions/school';

class SchoolSelectionDropdown extends React.Component {
  state = { schoolOptions: null, searchQuery: '' };

  onSearchChange(e, data) {
    this.setState({ searchQuery: data.searchQuery });
  }

  handleSchoolOptions() {
    if(!this.props.schools) {
      this.props.getSchools();
      return;
    }

    const q = this.state.searchQuery.toLowerCase();
    const qRegex = new RegExp(q, 'i');
    const filtered = Object.values(this.props.schools).filter(s => {
      return qRegex.test(s.name) || qRegex.test(s.aliases);
    });
    const sliced = filtered.slice(0, 100);

    this.setState({ schoolOptions: sliced.map(s => ({
      key: s._id, value: s._id, text: s.name,
    }))});
  }

  componentDidMount() {
    this.handleSchoolOptions();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.schools !== prevProps.schools ||
       this.state.searchQuery !== prevState.searchQuery) {
      this.handleSchoolOptions();
    }
  }

  render() {
    const { onChange } = this.props;
    const { schoolOptions } = this.state;
    return (
      <Dropdown search selection placeholder="School"
        onChange={onChange}
        onSearchChange={this.onSearchChange.bind(this)}
        options={schoolOptions}/>
    );
  }
}
SchoolSelectionDropdown.propTypes = {
  schools: PropTypes.array,
  getSchools: PropTypes.func,
  onChange: PropTypes.func,
};

const SchoolSelectionDropdownContainer = connect(
  state => ({
    schools: state.school.schools,
  }),
  dispatch => ({
    getSchools: () => dispatch(getSchools()),
  }),
)(SchoolSelectionDropdown);

export default SchoolSelectionDropdownContainer;
