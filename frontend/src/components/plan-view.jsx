import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/plan-view.css';
import Year from './year';
import DragDropMaster from './drag-drop-master';
import { Droppable } from 'react-beautiful-dnd';
import { Dimmer, Loader } from 'semantic-ui-react';
import Trash from './trash';
import { loadPlan, newPlan } from '../actions/plan-api';
import Header from './header';
import PlanTitle from './plan-title';

const PlanView = ({ plan }) => {
  return (
    <div className="plan-view">
      <div className="plan-title-wrapper">
        <PlanTitle />
      </div>
      <Droppable droppableId={plan.fid} type="PLAN-YEAR" direction="horizontal">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="year-container">
            { plan.years.map((p, i) => <Year year={p} key={p} index={i} />) }
            { provided.placeholder }
          </div>
        )}
      </Droppable>
      <Trash />
    </div>
  );
};

PlanView.propTypes = {
  plan: PropTypes.object,
};

const PlanViewContainer = connect(
  state => ({
    planId: state.plan.plan,
    plan: state.plan.plans[state.plan.plan],
    loading: state.plan.loading,
  }),
  dispatch => ({
  }),
)(PlanView);

const DragDropWrappedPlanView = ({ plans, match, loading, load, newPlan, planId }) => {
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
  </React.Fragment>
);

export default WithHeader;
