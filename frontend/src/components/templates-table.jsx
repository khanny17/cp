import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { templates } from '../actions/browse';
import { getPrefs } from '../actions/preferences';
import POL from './pull-on-load';
import { Header, Segment, Table } from 'semantic-ui-react';
import PreviewTemplateModal from './preview-template-modal';
import TemplateStar from './template-star';
import SchoolSelectionDropdown from './school-selection-dropdown';

const TemplateRows = ({ templates }) => {
  if(!templates || templates.error) {
    return (
      <Table.Row>
        <Table.Cell>Unable to load templates</Table.Cell>
      </Table.Row>
    );
  }

  if(templates.length === 0) {
    return (
      <Table.Row>
        <Table.Cell>No templates found</Table.Cell>
      </Table.Row>
    );
  }

  return templates.map(template => (
    <Table.Row key={template._id}>
      <Table.Cell>{template.plan.details.title}</Table.Cell>
      <Table.Cell collapsing>
        {template.stars.length}
        <TemplateStar template={template} />
      </Table.Cell>
      <Table.Cell>{template.tags.join(', ')}</Table.Cell>
      <Table.Cell>
        <PreviewTemplateModal template={template} />
      </Table.Cell>
    </Table.Row>
  ));
};

class Templates extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.filterSchool = this.filterSchool.bind(this);
  }

  applyFilters() {
    const { schoolFilter } = this.state;
    const { templates } = this.props;

    this.setState({
      templates: !templates.data ? [] :
        Object.values(templates.data).filter(template => {
          if(schoolFilter && template.school !== schoolFilter) {
            return false;
          }

          return true;
        })
    });
  }

  filterNames = [ 'schoolFilter' ];
  componentDidMount() {
    this.applyFilters();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.filterNames.some(f => prevState[f] !== this.state[f]) ||
      prevProps.templates !== this.props.templates) {
      this.applyFilters();
    }

    // If we haven't filtered the school yet, and we have a preferred school,
    // set the filter to that
    const prevPrefData = prevProps.preferences.data;
    const prefData = this.props.preferences.data;
    if(prefData && !this.state.schoolFilter &&
      (!prevPrefData || prevPrefData.school !== prefData.school)) {
      this.setState({ schoolFilter: prefData.school });
    }
  }

  filterSchool(e, data) {
    this.setState({ schoolFilter: data.value });
  }

  render() {
    const { preferences, getPrefs } = this.props;
    const { templates } = this.state;
    return (
      <React.Fragment>
        <Header as='h1' attached='top' block>
          Plan Templates
        </Header>
        <Segment attached loading={this.props.templates.loading}>
          <POL info={preferences} pull={getPrefs}>
            <SchoolSelectionDropdown school={this.state.schoolFilter}
              onChange={this.filterSchool}/>
          </POL>
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
              <TemplateRows templates={templates} />
            </Table.Body>
          </Table>
        </Segment>
      </React.Fragment>
    );
  }
}
Templates.propTypes = {
  templates: PropTypes.object,
  preferences: PropTypes.object,
  getPrefs: PropTypes.func,
};

const TemplatesPOL = (props) =>
  <POL info={props.templates} pull={props.getTemplates}>
    <Templates {...props} />
  </POL>
;
TemplatesPOL.propTypes = {
  templates: PropTypes.object,
  getTemplates: PropTypes.func,
};


const TemplatesContainer = connect(
  state => ({
    templates: state.browse.templates,
    preferences: state.preferences,
  }),
  dispatch => ({
    getTemplates: () => dispatch(templates()),
    getPrefs: () => dispatch(getPrefs()),
  }),
)(TemplatesPOL);


export default TemplatesContainer;
