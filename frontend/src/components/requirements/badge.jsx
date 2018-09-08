import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Badge = ({ badge }) =>
  <Draggable draggableId={badge.fid} type="COURSE-REQ" index="">
    {(provided, snapshot) => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div
            className={'badge ' + (badge.course ? 'shell ':'') + badge.shape}
            style={{ background: badge.color }}/>
          {provided.placeholder}
        </div>
      </div>
    )}
  </Draggable>
;
Badge.propTypes = { badge: PropTypes.object };

export default Badge;
