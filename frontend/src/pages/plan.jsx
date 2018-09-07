import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/plan-view.css';
import DragDropMaster from '../components/drag-drop-master';
import { Dimmer, Loader } from 'semantic-ui-react';
import { loadPlan, newPlan } from '../actions/plan-api';
import { Prompt } from 'react-router-dom';
import Navbar from '../components/navbar';
import Workspace from '../components/workspace';
import Requirements from '../components/requirements';

const PlanView = ({ plan }) => {
  return (
    <div className="plan-view">
      <Requirements />
      <Workspace plan={plan}/>
    </div>
  );
};

PlanView.propTypes = {
  plan: PropTypes.object,
};

const PlanViewContainer = connect(
  state => ({
    plan: state.plan.plans[state.plan.plan],
  }),
  dispatch => ({}),
)(PlanView);

const DragDropWrappedPlanView = ({
  plans, match, loading, load, newPlan, planId,
}) => {
  if(match.params.id) {
    const plan = plans[match.params.id];

    if(!plan && !loading) {
      load(match.params.id);
      return (
        <Dimmer active>
          <Loader>Loading Plan</Loader>
        </Dimmer>
      );
    }

    if(loading) {
      return (
        <Dimmer active>
          <Loader>Loading Plan</Loader>
        </Dimmer>
      );
    }

    if(plan.failed) {
      return <p>Failed to Load Plan with id {match.params.id}</p>;
    }
  } else {
    if(!planId || !plans[planId]) {
      newPlan();
    }
  }

  return(
    <DragDropMaster>
      <PlanViewContainer />
    </DragDropMaster>
  );
};

DragDropWrappedPlanView.propTypes = {
  plans: PropTypes.object,
  planId: PropTypes.string,
  match: PropTypes.object,
  loading: PropTypes.bool,
  failed: PropTypes.bool,
  load: PropTypes.func,
  newPlan: PropTypes.func,
};

const DragDropWrappedPlanViewContainer = connect(
  state => ({
    loading: state.plan.loading,
    plans: state.plan.plans,
    planId: state.plan.plan,
  }),
  dispatch => ({
    load: _id => dispatch(loadPlan(_id)),
    newPlan: () => dispatch(newPlan()),
  }),
)(DragDropWrappedPlanView);

const WithNavbar = (props) => (
  <React.Fragment>
    <Navbar />
    <DragDropWrappedPlanViewContainer {...props}/>
    <Prompt when={props.unsavedChanges}
      message="You have unsaved changes, are you sure you want to leave?"
    />
  </React.Fragment>
);
WithNavbar.propTypes = { unsavedChanges: PropTypes.bool, };

const WithNavbarContainer = connect(
  state => ({ unsavedChanges: state.ui.unsavedChanges }),
  dispatch => ({}),
)(WithNavbar);

export default WithNavbarContainer;
