import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import { updatePlan } from '../actions/plan';

const PlanTitle = ({ title, updatePlan }) =>
  <InlineEdit
    staticElement='h1'
    className="plan-title"
    activeClassName="plan-title editing"
    paramName="title"
    change={updatePlan}
    text={title}
  />
;
PlanTitle.propTypes = { title: PropTypes.string, updatePlan: PropTypes.func };

const PlanTitleContainer = connect(
  state => ({ title: state.plan.plans[state.plan.plan].title }),
  dispatch => ({
    updatePlan: updates => dispatch(updatePlan(updates))
  }),
)(PlanTitle);

export default PlanTitleContainer;
