import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import { updateRequirement } from '../../actions/plan';

const RequirementValue = ({ value, setVal }) =>
  <div className="value">
    {value.length === 0 ?
      <input onBlur={e => setVal(e.target.value)}
        onKeyPress={e => {
          if(e.key === 'Enter') {
            setVal(e.target.value);
          }
        }}
      />
      :
      <InlineEdit paramName="value" tabIndex={0} text={value}
        editing={value.length === 0}
        change={update => setVal(update.value)}
      />
    }
  </div>
;
RequirementValue.propTypes = {
  value: PropTypes.string,
  setVal: PropTypes.func,
};

export default connect(
  (state, { id }) => ({ value: state.plan.requirements[id].value }),
  (dispatch, { id }) => ({
    setVal: newVal => dispatch(updateRequirement({ fid: id, value: newVal })),
  }),
)(RequirementValue);
