import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
const UnsavedPrompt = ({ unsavedChanges }) =>
  <Prompt when={unsavedChanges}
    message="You have unsaved changes, are you sure you want to leave?"
  />
;
UnsavedPrompt.propTypes = { unsavedChanges: PropTypes.bool };

const UnsavedPromptContainer = connect(
  state => ({ unsavedChanges: state.ui.unsavedChanges }),
)(UnsavedPrompt);

export default UnsavedPromptContainer;
