import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const HighlightRequirement = ({ highlight, children }) =>
  <div className={'requirement '+(highlight ? 'highlight' : '')}>
    {children}
  </div>
;
HighlightRequirement.propTypes = {
  highlight: PropTypes.bool,
  children: PropTypes.array,
};

export default connect(
  (state, { id }) => ({
    highlight: state.ui.courseHoveringOver &&
      state.ui.courseHoveringOver === state.plan.requirements[id].course,
  })
)(HighlightRequirement);
