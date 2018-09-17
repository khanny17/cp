import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const DraggableTerm = ({ term, index, children }) => (
  <Draggable
    draggableId={term}
    type="YEAR-TERM"
    index={index}
  >
    {(provided, snapshot) => (
      <div className="pre-draggable">
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            opacity: snapshot.isDragging ? '.5' : '1',
            border: snapshot.isDragging ? '1px dotted gray' : 'none',
            borderRadius: '5px',
            ...provided.draggableProps.style,
          }}
        >
          {children}
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);
DraggableTerm.propTypes = {
  term: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.element,
};

export default DraggableTerm;
