import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Icon } from 'semantic-ui-react';

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
          <Icon name={badge.course ? 'circle outline' : 'certificate'}
            className="badge"/>
          {provided.placeholder}
        </div>
      </div>
    )}
  </Draggable>
;
Badge.propTypes = { badge: PropTypes.object };

export default Badge;
