import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { Icon } from 'semantic-ui-react';

const Badge = ({ requirement }) =>
  <Draggable draggableId={requirement.fid} type="COURSE-REQ" index="">
    {(provided, snapshot) =>
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <Icon name={requirement.course ? 'circle outline' : 'certificate'}
            className="badge"/>
          {provided.placeholder}
        </div>
      </div>
    }
  </Draggable>
;
Badge.propTypes = { requirement: PropTypes.object };

export default connect(
  (state, { requirement }) => ({
    requirement: state.plan.requirements[requirement],
  })
)(Badge);
