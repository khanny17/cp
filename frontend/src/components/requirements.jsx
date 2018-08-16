import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dropdown, Header, Icon, List } from 'semantic-ui-react';
import InlineEdit from 'react-edit-inline';
import { Rnd } from 'react-rnd';
import { addRequirement, updateRequirement } from '../actions/plan';
import '../css/requirements.css';


class Requirement extends React.Component {
  typeOptions = [
    {
      text: 'Course',
      value: 'COURSE',
    },
    {
      text: 'Attribute',
      value: 'ATTRIBUTE',
    },
  ];

  onChange(toUpdate) {
    this.props.updateRequirement({
      fid: this.props.requirement.fid,
      ...toUpdate,
    });
  }

  render() {
    const { requirement } = this.props;
    return (
      <div className="requirement">
        <div className="type">
          <Dropdown placeholder="Type" options={this.typeOptions} inline
            value={requirement.type}
            onChange={(e, data) => this.onChange({ type: data.value })}
          />
        </div>

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
              change={this.onChange.bind(this)}
            />
          }
        </div>
      </div>
    );
  }
}

Requirement.propTypes = {
  requirement: PropTypes.object,
  updateRequirement: PropTypes.func,
};

const Requirements = ({ requirements, addRequirement, updateRequirement }) =>
  <div>
    <Header as='h1'>Requirements</Header>
    <List>
      {Object.values(requirements).map(req => (
        <List.Item key={req.fid}>
          <Requirement
            requirement={req}
            updateRequirement={updateRequirement}
          />
        </List.Item>
      ))}
    </List>
    <Button onClick={addRequirement}>
      <Icon name="plus" />Add
    </Button>
  </div>
;
Requirements.propTypes = {
  addRequirement: PropTypes.func,
  updateRequirement: PropTypes.func,
  requirements: PropTypes.object,
};

const RequirementsContainer = connect(
  state => ({ requirements: state.plan.requirements }),
  dispatch => ({
    addRequirement: () => dispatch(addRequirement()),
    updateRequirement: toUpdate => dispatch(updateRequirement(toUpdate)),
  }),
)(Requirements);

class RndRequirements extends React.Component {
  state = { width: 250, height: 250 };
  render() {
    const { width, height } = this.state;
    return (
      <Rnd
        className="requirements"
        size={{ width: width, height: height }}
        position={{ x: 0, y: 0 }}
        disableDragging={true}
        enableResizing={{ right: true }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
      >
        <RequirementsContainer {...this.props} />
      </Rnd>
    );
  }
}

export default RndRequirements;
