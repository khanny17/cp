import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, Icon } from 'semantic-ui-react';
import findFailingRequirements from '../../selectors/find-failing-requirements';
import { updateRequirement } from '../../actions/plan';

const typeStyles = {
  COURSE: { color: 'blue' },
  ATTRIBUTE: { color: 'purple' },
};

const typeOptions = [
  {
    text: (
      <span>
        <Icon name="circle" style={typeStyles.COURSE} />
        Course
      </span>
    ),
    value: 'COURSE',
  },
  {
    text: (
      <span>
        <Icon name="circle" style={typeStyles.ATTRIBUTE} />
        Attribute
      </span>
    ),
    value: 'ATTRIBUTE',
  },
];

const RequirementTypeSelect = ({ type, met, updateType }) =>
  <div className="type">
    <Dropdown inline options={typeOptions} style={typeStyles[type]}
      icon={met ? 'circle' : 'circle outline'}
      onChange={updateType}
    />
  </div>
;
RequirementTypeSelect.propTypes = {
  options: PropTypes.object,
  type: PropTypes.string,
  met: PropTypes.bool,
  updateType: PropTypes.func,
};

export default connect(
  (state, { id }) => ({
    type: state.plan.requirements[id].type,
    met: !findFailingRequirements(state)[id],
  }),
  (dispatch, { id }) => ({
    updateType: (e, data) => {
      return dispatch(updateRequirement({ fid: id, type: data.value }));
    },
  }),
)(RequirementTypeSelect);
