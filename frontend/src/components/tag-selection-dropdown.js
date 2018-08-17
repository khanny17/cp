import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { getTags } from '../actions/template';

class TagSelectionDropdown extends React.Component {
  state = { tagOptions: null, addedTags: [] };

  componentDidMount() {
    this.handleTagOptions();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.tags !== prevProps.tags ||
      this.state.addedTags !== prevState.addedTags) {
      this.handleTagOptions();
    }
  }


  onAddItem(e, data) {
    this.setState({ addedTags: this.state.addedTags.concat(data.value) });
  }

  handleTagOptions() {
    if(!this.props.tags) {
      this.props.getTags();
      return;
    }

    const allTags = this.props.tags.concat(this.state.addedTags);
    this.setState({ tagOptions: allTags.map(t => ({
      key: t, value: t, text: t,
    }))});
  }

  render() {
    const { onChange } = this.props;
    const { tagOptions } = this.state;
    return (
      <Dropdown search selection multiple allowAdditions
        placeholder="Tags"
        onChange={onChange}
        onAddItem={this.onAddItem.bind(this)}
        options={tagOptions}/>
    );
  }
}
TagSelectionDropdown.propTypes = {
  tags: PropTypes.array,
  getTags: PropTypes.func,
  onChange: PropTypes.func,
};

const TagSelectionDropdownContainer = connect(
  state => ({
    tags: state.template.tags,
  }),
  dispatch => ({
    getTags: () => dispatch(getTags()),
  }),
)(TagSelectionDropdown);

export default TagSelectionDropdownContainer;
