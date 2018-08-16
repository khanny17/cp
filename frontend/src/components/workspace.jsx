import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import PlanTitle from './plan-title';
import Year from './year';
import Trash from './trash';
import '../css/workspace.css';

const Workspace = ({ plan }) =>
  <div className="workspace">
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
;

Workspace.propTypes = { plan: PropTypes.object };

export default Workspace;
