import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveCourse, moveTerm, moveYear } from '../actions/plan';

function onDragEnd(result, { moveCourse, moveTerm, moveYear }) {
  const { draggableId, type, source, destination } = result;

  if(!destination) {
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

const DragDropMaster = ({ children, moveCourse, moveTerm, moveYear }) => (
  <DragDropContext onDragEnd={result => onDragEnd(result, {
    moveCourse, moveTerm, moveYear,
  })}>
    <div>{children}</div>
  </DragDropContext>
);

DragDropMaster.propTypes = {
  children: PropTypes.element,
  moveCourse: PropTypes.func,
  moveTerm: PropTypes.func,
  moveYear: PropTypes.func,
};

const DragDropMasterContainer = connect(
  state => ({}),
  dispatch => ({
    moveYear: (id, source, dest) => dispatch(moveYear(id, source, dest)),
    moveTerm: (id, source, dest) => dispatch(moveTerm(id, source, dest)),
    moveCourse: (id, source, dest) => dispatch(moveCourse(id, source, dest)),
  }),
)(DragDropMaster);

export default DragDropMasterContainer;
