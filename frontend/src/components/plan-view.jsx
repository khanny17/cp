import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/plan-view.css';
import DragDropMaster from './drag-drop-master';
import { Dimmer, Loader } from 'semantic-ui-react';
import { loadPlan, newPlan } from '../actions/plan-api';
import { Prompt } from 'react-router-dom';
import Header from './header';
import Workspace from './workspace';
import Requirements from './requirements';

const PlanView = ({ plan, showReqsSidebar }) => {
  return (
    <div className="plan-view">
      { showReqsSidebar ? <Requirements /> : null }
      <Workspace plan={plan}/>
    </div>
  );
};

PlanView.propTypes = {
  plan: PropTypes.object,
  showReqsSidebar: PropTypes.bool,
};

const PlanViewContainer = connect(
  state => ({
    plan: state.plan.plans[state.plan.plan],
    showReqsSidebar: state.ui.showReqsSidebar,
  }),
  dispatch => ({
  }),
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

const WithHeader = (props) => (
  <React.Fragment>
    <Header />
    <DragDropWrappedPlanViewContainer {...props}/>
    <Prompt when={props.unsavedChanges}
      message="You have unsaved changes, are you sure you want to leave?"
    />
  </React.Fragment>
);
WithHeader.propTypes = { unsavedChanges: PropTypes.bool, };

const WithHeaderContainer = connect(
  state => ({ unsavedChanges: state.ui.unsavedChanges }),
  dispatch => ({}),
)(WithHeader);

export default WithHeaderContainer;
