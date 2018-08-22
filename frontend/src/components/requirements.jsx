import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dropdown, Header, Icon, List } from 'semantic-ui-react';
import InlineEdit from 'react-edit-inline';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Rnd } from 'react-rnd';
import { addRequirement, updateRequirement } from '../actions/plan';
import findFailingRequirements from '../util/requirements-met';
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
    const { requirement, notMet } = this.props;
    return (
      <div className="requirement">
        <Icon name={notMet ? 'circle outline' : 'circle'} />
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
  notMet: PropTypes.bool,
};

const DraggableReq = (props) => (
  <Draggable
    draggableId={props.requirement.fid}
    type="COURSE-REQ"
    index={props.index}
  >
    {(provided, snapshot) => (
      <div className="pre-draggable">
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <Requirement {...props}/>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);
DraggableReq.propTypes = {
  requirement: PropTypes.object,
  index: PropTypes.number,
};

const Requirements = ({
  requirements,
  addRequirement,
  updateRequirement,
  failingRequirements,
}) =>
  <div>
    <Header as='h1'>Requirements</Header>
    <List>
      {Object.values(requirements).map(req => (
        <List.Item key={req.fid}>
          <DraggableReq
            notMet={!!failingRequirements[req.fid]}
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
  failingRequirements: PropTypes.object,
};

const DroppableRequirements = (props) =>
  <Droppable droppableId={'REQUIREMENTS'} type="COURSE-REQ">
    {(provided, snapshot) => (
      <div ref={provided.innerRef}>
        <Requirements {...props} />
        { provided.placeholder }
      </div>
    )}
  </Droppable>
;

const RequirementsContainer = connect(
  state => ({
    requirements: state.plan.requirements,
    failingRequirements: findFailingRequirements(state.plan),
  }),
  dispatch => ({
    addRequirement: () => dispatch(addRequirement()),
    updateRequirement: toUpdate => dispatch(updateRequirement(toUpdate)),
  }),
)(DroppableRequirements);

class RndRequirements extends React.Component {
  state = { width: 300, height: 300 };
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
RndRequirements.propTypes = { show: PropTypes.bool };

export default RndRequirements;
