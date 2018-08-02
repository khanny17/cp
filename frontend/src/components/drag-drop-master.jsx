import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveCourse, moveTerm, moveYear, deleteItem } from '../actions/plan';
import { showTrash, hideTrash } from '../actions/ui';

function onDragStart(result, showTrash) {
  if(result.type === 'TERM-COURSE') {
    showTrash();
  }
}

function onDragEnd(result, functions) {
  const { moveCourse, moveTerm, moveYear, hideTrash, deleteItem } = functions;

  hideTrash(); // Handle this first

  // Now do the actual work
  const { draggableId, type, source, destination } = result;

  if(!destination) {
    return;
  }

  if(destination.droppableId === 'TRASH') {
    deleteItem(type, draggableId, source.droppableId);
    return;
  }

  switch(type) {

  case 'PLAN-YEAR':
    moveYear(
      draggableId,
      { id: source.droppableId, index: source.index },
      { id: destination.droppableId, index: destination.index },
    );
    break;

  case 'YEAR-TERM':
    moveTerm(
      draggableId,
      { id: source.droppableId, index: source.index },
      { id: destination.droppableId, index: destination.index },
    );
    break;

  case 'TERM-COURSE':
    moveCourse(
      draggableId,
      { id: source.droppableId, index: source.index },
      { id: destination.droppableId, index: destination.index },
    );
    break;

  default:
    break;
  }
}

const DragDropMaster = ({
  children,
  moveCourse,
  moveTerm,
  moveYear,
  showTrash,
  hideTrash,
  deleteItem,
}) => (
  <DragDropContext
    onDragStart={result => onDragStart(result, showTrash)}
    onDragEnd={result => onDragEnd(result, {
      moveCourse, moveTerm, moveYear, hideTrash, deleteItem,
    })}
  >
    <div>{children}</div>
  </DragDropContext>
);

DragDropMaster.propTypes = {
  children: PropTypes.element,
  moveCourse: PropTypes.func,
  moveTerm: PropTypes.func,
  moveYear: PropTypes.func,
  deleteItem: PropTypes.func,

  showTrash: PropTypes.func,
  hideTrash: PropTypes.func,
};

const DragDropMasterContainer = connect(
  state => ({}),
  dispatch => ({
    moveYear: (id, source, dest) => dispatch(moveYear(id, source, dest)),
    moveTerm: (id, source, dest) => dispatch(moveTerm(id, source, dest)),
    moveCourse: (id, source, dest) => dispatch(moveCourse(id, source, dest)),
    deleteItem: (type, item_id, list_id) => {
      return dispatch(deleteItem(type, item_id, list_id));
    },
    showTrash: () => dispatch(showTrash()),
    hideTrash: () => dispatch(hideTrash()),
  }),
)(DragDropMaster);

export default DragDropMasterContainer;
