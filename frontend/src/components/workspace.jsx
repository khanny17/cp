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
import CoursePrereqLines from './course-prereq-lines';

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.inner = this.inner.bind(this);
  }

  inner(provided, snapshot) {
    const { years } = this.props;
    return (
      <div ref={provided.innerRef} className="year-container">
        { years.map((p, i) => <Year year={p} key={p} index={i} />) }
        { provided.placeholder }
      </div>
    );
  }

  render() {
    const { planId } = this.props;
    return (
      <div className="workspace">
        <div className="plan-title-wrapper">
          <PlanTitle />
          <div style={{ flex: 1 }} />
          <PlanSchool />
        </div>
        <Droppable droppableId={planId} type="PLAN-YEAR" direction="horizontal">
          {this.inner}
        </Droppable>
        <Trash />
        <CoursePrereqLines />
      </div>
    );
  }
}
Workspace.propTypes = { planId: PropTypes.string, years: PropTypes.array };

const WorkspaceContainer = connect(
  state => ({
    planId: state.plan.plan,
    years: state.plan.plans[state.plan.plan].years,
  }),
)(Workspace);


class ContextMenuWorkspace extends React.Component {
  handleAction(e, data) {
    switch(data.action) {
    case 'addYear':
      this.props.addYear({
        title: 'Year ' + (this.props.years.length+1)
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
          <WorkspaceContainer />
        </ContextMenuTrigger>

        <WorkspaceContextMenu id={'WORKSPACE'}
          onClick={this.handleAction.bind(this)} />

      </React.Fragment>
    );
  }
}
ContextMenuWorkspace.propTypes = {
  years: PropTypes.array,
  addYear: PropTypes.func,
  //I'm thinking of adding an 'Edit Colorscheme' option?
  //  you know, a modal to change subject colors all at once?
};

const ContextMenuWorkspaceContainer = connect(
  state => ({
    years: state.plan.plans[state.plan.plan].years,
  }),
  dispatch => ({
    addYear: year => dispatch(addYear(year)),
  }),
)(ContextMenuWorkspace);


export default ContextMenuWorkspaceContainer;
