import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Table } from 'semantic-ui-react';
import PreviewTemplateModal from './preview-template-modal';
import TemplateStar from './template-star';

const Templates = ({ templates, user, loadingTemplates }) =>
  <React.Fragment>
    <Header as='h1' attached='top' block>
      Plan Templates
    </Header>
    <Segment attached loading={loadingTemplates}>
      <Table basic="very" selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Plan Name</Table.HeaderCell>
            <Table.HeaderCell collapsing>Stars</Table.HeaderCell>
            <Table.HeaderCell>Tags</Table.HeaderCell>
            <Table.HeaderCell/>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {templates && !templates.error ?
            Object.values(templates).map(template => (
              <Table.Row key={template._id}>
                <Table.Cell>{template.plan.details.title}</Table.Cell>
                <Table.Cell collapsing>
                  {template.stars.length}
                  <TemplateStar template={template} />
                </Table.Cell>
                <Table.Cell>{template.tags}</Table.Cell>
                <Table.Cell>
                  <PreviewTemplateModal template={template} />
                </Table.Cell>
              </Table.Row>
            ))
            :
            <Table.Row>
              <Table.Cell style={{ textAlign: 'center' }}>
                {templates === null || templates.error ?
                  'Unable to load templates' :
                  'No templates found'}
              </Table.Cell>
            </Table.Row>
          }
        </Table.Body>
      </Table>
    </Segment>
  </React.Fragment>
;

Templates.propTypes = {
  templates: PropTypes.object,
  user: PropTypes.object,
  loadingTemplates: PropTypes.bool,
};

export default Templates;
