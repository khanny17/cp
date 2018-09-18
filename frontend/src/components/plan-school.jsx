import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PlanSchool = ({ school, schools, loading, error}) =>
  <h1 className="plan-school">
    {loading ? '...' :
      error || !schools ? '' :
        schools[school]}
  </h1>
;
PlanSchool.propTypes = {
  school: PropTypes.string,
  schools: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const PlanSchoolContainer = connect(
  state => ({
    school: state.plan.plans[state.plan.plan].school,
    schools: state.school.schools,
    loading: state.school.loading,
    error: state.school.error,
  }),
  dispatch => ({
  }),
)(PlanSchool);

export default PlanSchoolContainer;
