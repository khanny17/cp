import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMine, templates, } from '../actions/browse';
import { newPlan } from '../actions/plan-api';
import { toggleStar } from '../actions/template';
import MyHeader from './header';
import { Container } from 'semantic-ui-react';
import '../css/browse-view.css';
import TemplatesSection from './browse-view-templates-section';
import MyPlansSection from './browse-view-my-plans-section';

class BrowseView extends React.Component {
  handleMyPlans() {
    if(this.props.my_plans === null) {
      this.props.getMine();
    }
  }

  handleTemplates() {
    if(this.props.templates === null) {
      this.props.getTemplates();
    }
  }

  componentDidMount() {
    this.handleMyPlans();
    this.handleTemplates();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.my_plans !== prevProps.my_plans) {
      this.handleMyPlans();
    }

    if(this.props.templates !== prevProps.templates) {
      this.handleTemplates();
    }
  }


  render() {
    const { my_plans, templates, loading_my_plans, user,
      loadingTemplates, newPlan, toggleStar } = this.props;
    return (
      <div>
        <MyHeader />
        <Container text style={{ textAlign: 'left' }}>

          <MyPlansSection
            my_plans={my_plans}
            loading_my_plans={loading_my_plans}
            newPlan={newPlan}
          />

          <TemplatesSection
            templates={templates}
            user={user}
            loadingTemplates={loadingTemplates}
            toggleStar={toggleStar}
          />

        </Container>
      </div>
    );
  }
}

BrowseView.propTypes = {
  user: PropTypes.object,
  my_plans: PropTypes.array,
  templates: PropTypes.any,
  loading_my_plans: PropTypes.bool,
  loadingTemplates: PropTypes.bool,
  getMine: PropTypes.func,
  getTemplates: PropTypes.func,
  newPlan: PropTypes.func,
  toggleStar: PropTypes.func,
};

const BrowseViewContainer = connect(
  state => ({
    user: state.auth.user,
    loading_my_plans: state.browse.loading_my_plans,
    my_plans: state.browse.my_plans,
    loadingTemplates: state.browse.loadingTemplates,
    templates: state.browse.templates,
  }),
  dispatch => ({
    getTemplates: () => dispatch(templates()),
    getMine: () => dispatch(getMine()),
    newPlan: () => dispatch(newPlan()),
    toggleStar: templateId => dispatch(toggleStar(templateId)),
  }),
)(BrowseView);

export default BrowseViewContainer;
