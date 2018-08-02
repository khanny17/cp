import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { Droppable } from 'react-beautiful-dnd';

const Trash = ({ show }) => (
  <Droppable droppableId="TRASH" type="TERM-COURSE">
    {(provided, snapshot) => (
      <div 
        ref={provided.innerRef}
        className="trash"
        style={{
          position: 'fixed',
          bottom: '25px',
          left: '25px',
          visibility: show ? 'visible' : 'hidden',
        }}
        {...provided.droppableProps}
      >
        <Icon name="trash" size="huge"/>
        <div style={{display: 'none'}}>{provided.placeholder}</div>
      </div>
    )}
  </Droppable>
);

Trash.propTypes = {
  show: PropTypes.bool,
};

const TrashContainer = connect(
  state => ({ show: state.ui.showTrash }),
  dispatch => ({}),
)(Trash);


export default TrashContainer;
