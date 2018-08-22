import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import PlanTitle from './plan-title';
import PlanSchool from './plan-school';
import Year from './year';
import Trash from './trash';
import { ContextMenuTrigger } from 'react-contextmenu';
import WorkspaceContextMenu from './workspace-contextmenu';
import { addYear } from '../actions/plan';
import '../css/workspace.css';

const Workspace = ({ plan }) =>
  <div className="workspace">
    <div className="plan-title-wrapper">
      <PlanTitle />
      <div style={{ flex: 1 }} />
      <PlanSchool />
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

class ContextMenuWorkspace extends React.Component {
  handleAction(e, data) {
    switch(data.action) {
    case 'addYear':
      this.props.addYear({
        title: 'Year ' + (this.props.plan.years.length+1)
      });
      break;
    default:
      return;
    }
  }

  render() {
    return (
      <React.Fragment>
        <ContextMenuTrigger id={'WORKSPACE'} >
          <Workspace {...this.props} />
        </ContextMenuTrigger>

        <WorkspaceContextMenu id={'WORKSPACE'}
          onClick={this.handleAction.bind(this)} />

      </React.Fragment>
    );
  }
}
ContextMenuWorkspace.propTypes = {
  plan: PropTypes.object,
  addYear: PropTypes.func,
  //I'm thinking of adding an 'Edit Colorscheme' option?
  //  you know, a modal to change subject colors all at once?
};

const ContextMenuWorkspaceContainer = connect(
  state => ({}),
  dispatch => ({
    addYear: year => dispatch(addYear(year)),
  }),
)(ContextMenuWorkspace);



export default ContextMenuWorkspaceContainer;
