import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dimmer, Icon, Loader, Modal } from 'semantic-ui-react';
import TemplateStar from './template-star';
import PlanPreview from './plan-preview';
import { getFullTemplate } from '../actions/template';
import { newPlan } from '../actions/plan-api';

class PreviewTemplateModal extends React.Component {
  getIfNeeded() {
    const { template, getFullTemplate } = this.props;
    if(!template.plan.years && !template.loading){
      //This means we only have a summary of the data
      getFullTemplate(template._id);
    }
  }

  render() {
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
        <Modal.Content>
          { template.loading ?
            <Dimmer active inverted><Loader/></Dimmer>
            :
            <PlanPreview plan={template.plan} />
          }
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
