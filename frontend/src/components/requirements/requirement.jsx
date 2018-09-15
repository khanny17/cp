import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import { Dropdown, Icon } from 'semantic-ui-react';
import { updateRequirement, deleteRequirement } from '../../actions/plan';
import findFailingRequirements from '../../selectors/find-failing-requirements';
import Badges from './badges';

const typeStyles = {
  COURSE: { color: 'blue' },
  ATTRIBUTE: { color: 'purple' },
};

const typeOptions = [
  {
    text: (
      <span>
        <Icon name="circle" style={typeStyles.COURSE} />
        Course
      </span>
    ),
    value: 'COURSE',
  },
  {
    text: (
      <span>
        <Icon name="circle" style={typeStyles.ATTRIBUTE} />
        Attribute
      </span>
    ),
    value: 'ATTRIBUTE',
  },
];

const RequirementTypeSelect = ({ type, met, onChange }) =>
  <div className="type">
    <Dropdown
      inline
      options={typeOptions}
      icon={met ? 'circle' : 'circle outline'}
      style={typeStyles[type]}
      onChange={onChange}
    />
  </div>
;
RequirementTypeSelect.propTypes = {
  options: PropTypes.object,
  type: PropTypes.string,
  met: PropTypes.bool,
  onChange: PropTypes.func,
};

class Requirement extends React.PureComponent {

  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);

    this.state = { requirement: this.props.requirement };
  }

  onChange(toUpdate) {
    this.props.updateRequirement({
      fid: this.props.requirement.fid,
      ...toUpdate,
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.requirement !== this.props.requirement) {
      this.setState({ requirement: this.props.requirement });
    }
  }

  delete() {
    this.props.deleteRequirement(this.state.requirement.fid);
  }

  onDropdownChange = (e, data) => this.onChange({ type: data.value });

  render() {
    const { notMet } = this.props;
    const { requirement } = this.state;

    return (
      <React.Fragment>
        <RequirementTypeSelect
          type={requirement.type}
          met={!notMet}
          onChange={this.onDropdownChange}
        />

        <div className="value">
          {requirement.value.length === 0 ?
            <input onBlur={e => this.onChange({ value: e.target.value })}
              onKeyPress={e => {
                if(e.key === 'Enter') {
                  this.onChange({ value: e.target.value });
                }
              }}
            />
            :
            <InlineEdit
              paramName="value"
              tabIndex={0}
              editing={requirement.value.length === 0}
              text={requirement.value}
              change={this.onChange}
            />
          }
        </div>

        {requirement.type === 'ATTRIBUTE' ?
          <Badges badges={[{
            fid: requirement.fid,
            color: 'red',
            shape: 'diamond',
            course: requirement.course,
          }]} />
          : null}

        <div style={{ flex: 1 }} />

        <Icon name="times" className="delete-requirement"
          onClick={this.delete} />
      </React.Fragment>
    );
  }
}
Requirement.propTypes = {
  requirement: PropTypes.object,
  updateRequirement: PropTypes.func,
  deleteRequirement: PropTypes.func,
  notMet: PropTypes.bool,
};

const RequirementHighlightWrapper = ({ highlight, ...props }) =>
  <div className={'requirement '+(highlight ? 'highlight' : '')}>
    <Requirement {...props} />
  </div>
;
RequirementHighlightWrapper.propTypes = { highlight: PropTypes.bool };


const RequirementHighlightContainer = connect(
  (state, { id }) => ({
    notMet: !!findFailingRequirements(state)[id],
    highlight: state.ui.courseHoveringOver &&
      state.ui.courseHoveringOver === state.plan.requirements[id].course,
    requirement: state.plan.requirements[id],
  }),
  dispatch => ({
    updateRequirement: toUpdate => dispatch(updateRequirement(toUpdate)),
    deleteRequirement: toDelete => dispatch(deleteRequirement(toDelete)),
  }),
)(RequirementHighlightWrapper);

export default RequirementHighlightContainer;
