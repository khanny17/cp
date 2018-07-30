import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/term.css';
import Course from './course';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Term = ({ term }) => (
  <div className="term">
    <h3>{term.title}</h3>
    <Droppable droppableId={term.fid} type="TERM-COURSE">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="course-container"
        >
          { term.courses.map((c, i) => <Course course={c} key={c} index={i} />) }
          { provided.placeholder }
        </div>
      )}
    </Droppable>
  </div>
);

Term.propTypes = {
  term: PropTypes.object,
};

const DraggableTerm = (props) => (
  <Draggable
    draggableId={props.term.fid}
    type="YEAR-TERM"
    index={props.index}
  >
    {(provided, snapshot) => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            opacity: snapshot.isDragging ? '.5' : '1',
            ...provided.draggableProps.style,
          }}
        >
          <Term {...props}/>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);

DraggableTerm.propTypes = {
  term: PropTypes.object,
  index: PropTypes.number,
};

const TermContainer = connect(
  (state, { term }) => ({ term: state.plan.terms[term] }),
  dispatch => ({}),
)(DraggableTerm);

export default TermContainer;
