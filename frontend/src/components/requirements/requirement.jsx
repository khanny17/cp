import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { deleteRequirement } from '../../actions/plan';
import Badges from './badges';
import HighlightRequirement from './highlight-requirement';
import RequirementTypeSelect from './requirement-type-select';
import RequirementValue from './requirement-value';


const Requirement = ({ id, deleteRequirement }) =>
  <HighlightRequirement id={id}>
    <RequirementTypeSelect id={id} />
    <RequirementValue id={id} />
    <Badges id={id} />

    <div style={{ flex: 1 }} />

    <Icon name="times" className="delete-requirement"
      onClick={deleteRequirement} />
  </HighlightRequirement>
;
Requirement.propTypes = {
  id: PropTypes.string,
  deleteRequirement: PropTypes.func,
};

export default connect(
  state => ({}),
  (dispatch, { id }) => ({
    deleteRequirement: () => dispatch(deleteRequirement(id)),
  }),
)(Requirement);
