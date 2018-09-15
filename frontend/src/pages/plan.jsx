import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/plan-view.css';
import DragDropMaster from '../components/drag-drop-master';
import { Dimmer, Header, Icon, Loader } from 'semantic-ui-react';
import { loadPlan, newPlan } from '../actions/plan-api';
import Navbar from '../components/navbar';
import Workspace from '../components/workspace';
import Requirements from '../components/requirements';
import UnsavedPrompt from '../components/unsaved-prompt';

const PlanView = () =>
  <div className="plan-view">
    <Requirements />
    <Workspace />
  </div>
;

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
      return (
        <div className="couldnt-find-plan">
          <Icon name="question circle outline" size="massive" />
          <Header>
            {'We couldn\'t find that plan! Did you delete it?'}
            <Header.Subheader>
              {'Maybe try going back to your home page and refreshing?'}
            </Header.Subheader>
          </Header>
        </div>
      );
    }
  } else {
    if(!planId || !plans[planId]) {
      newPlan();
    }
  }

  return(
    <DragDropMaster>
      <PlanView />
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
    <UnsavedPrompt />
  </React.Fragment>
);

export default WithNavbar;
