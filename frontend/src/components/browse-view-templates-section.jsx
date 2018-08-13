import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Segment, Table } from 'semantic-ui-react';

const Templates = ({ templates, user, loadingTemplates, toggleStar }) =>
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
            templates.map(template => (
              <Table.Row key={template._id}>
                <Table.Cell>{template.plan.details.title}</Table.Cell>
                <Table.Cell collapsing>
                  {template.stars.length}
                  {template.togglingStar ?
                    <Icon loading name="circle notch" className="star"/>
                    :
                    <Icon
                      name={template.stars.includes(user._id) ?
                        'star' : 'star outline'
                      }
                      className="star"
                      onClick={() => toggleStar(template._id)} />
                  }
                </Table.Cell>
                <Table.Cell>{template.tags}</Table.Cell>
                <Table.Cell>
                  <Button icon inverted color="blue" size="mini"
                    className="show-on-hover" style={{float: 'right'}}>
                    <Icon name="copy"/>Preview
                  </Button>
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
  templates: PropTypes.array,
  user: PropTypes.object,
  loadingTemplates: PropTypes.bool,
  toggleStar: PropTypes.func,
};

export default Templates;
