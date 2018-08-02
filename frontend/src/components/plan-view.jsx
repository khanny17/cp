import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/plan-view.css';
import Year from './year';
import DragDropMaster from './drag-drop-master';
import { Droppable } from 'react-beautiful-dnd';
import Trash from './trash';

const PlanView = ({ plan }) => (
  <div className="plan-view">
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

PlanView.propTypes = {
  plan: PropTypes.object,
};

const DragDropWrappedPlanView = (props) => (
  <DragDropMaster>
    <PlanView {...props}/>
  </DragDropMaster>
);

const DragDropWrappedPlanViewContainer = connect(
  (state, { plan }) => ({ plan: state.plan.plans[state.plan.plan] }),
  dispatch => ({}),
)(DragDropWrappedPlanView);

export default DragDropWrappedPlanViewContainer;
