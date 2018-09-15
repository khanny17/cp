import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dimmer, Header, Icon, Loader, Menu, Modal }
  from 'semantic-ui-react';
import TemplateStar from './template-star';
import PlanPreview from './plan-preview';
import RequirementsPreview from './requirements-preview';
import { getFullTemplate } from '../actions/template';
import { newPlan } from '../actions/plan-api';

const DescriptionTab = ({ template }) =>
  <div>
    <Header>Description</Header>
    {template.description}
    <Header>Tags</Header>
    {template.tags.join(', ')}
    <Header>School</Header>
    {template.school}
  </div>
;
DescriptionTab.propTypes = { template: PropTypes.object };

const PlanTab = ({ template }) =>
  template.loading ?
    <Dimmer active inverted><Loader/></Dimmer>
    :
    <PlanPreview plan={template.plan} />
;
PlanTab.propTypes = { template: PropTypes.object };

const ReqTab = ({ template }) =>
  template.loading ?
    <Dimmer active inverted><Loader/></Dimmer>
    :
    <RequirementsPreview requirements={template.plan.requirements}/>
;
ReqTab.propTypes = { template: PropTypes.object };

class PreviewTemplateModal extends React.Component {
  getIfNeeded() {
    const { template, getFullTemplate } = this.props;
    if(!template.plan.years && !template.loading){
      //This means we only have a summary of the data
      getFullTemplate(template._id);
    }
  }

  state = { activeTab: 'description' };
  setTab(name) {
    this.setState({ activeTab: name });
  }

  render() {
    const { activeTab } = this.state;
    const { template, loadTemplate } = this.props;
    return (
      <Modal closeIcon onOpen={this.getIfNeeded.bind(this)}
        trigger={(
          <Button icon inverted color="blue" size="mini"
            className="show-on-hover" style={{float: 'right'}}>
            <Icon name="copy"/>Preview
          </Button>
        )}
      >

        <Modal.Header style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>{template.plan.details.title}</div>
          <div style={{ flex: '0 0 auto' }}>
            {template.stars.length}
            <TemplateStar template={template} />
          </div>
        </Modal.Header>

        <Modal.Content scrolling>
          <Menu tabular>
            <Menu.Item name='description' active={ activeTab === 'description' }
              onClick={() => this.setTab('description')} />
            <Menu.Item name='plan' active={ activeTab === 'plan' }
              onClick={() => this.setTab('plan')} />
            <Menu.Item name='requirements' active={ activeTab === 'requirements' }
              onClick={() => this.setTab('requirements')} />
          </Menu>

          <div style={{ overflow: 'auto' }}>
            { activeTab === 'plan' ?
              <PlanTab template={template}/> : null }

            { activeTab === 'requirements' ?
              <ReqTab template={template}/> : null }

            { activeTab === 'description' ?
              <DescriptionTab template={template}/> : null }
          </div>

        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => loadTemplate(template)}>
            Load
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

PreviewTemplateModal.propTypes = {
  template: PropTypes.object,
  getFullTemplate: PropTypes.func,
  loadTemplate: PropTypes.func,
};


const PreviewTemplateModalContainer = connect(
  state => ({
  }),
  dispatch => ({
    getFullTemplate: id => dispatch(getFullTemplate(id)),
    loadTemplate: template => dispatch(newPlan(template.plan)),
  }),
)(PreviewTemplateModal);



export default PreviewTemplateModalContainer;
