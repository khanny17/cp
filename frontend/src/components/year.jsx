import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/year.css';
import Term from './term';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Year = ({ year }) => (
  <div className="year">
    <h2>{year.title}</h2>
    <Droppable droppableId={year.fid} type="YEAR-TERM" direction="horizontal">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            display: 'flex',
            height: '100%',
            border: snapshot.isDraggingOver ? '1px dashed gray' : 'none',
            borderRadius: '5px',
          }}
          {...provided.droppableProps}
        >
          { year.terms.map((t, i) => <Term term={t} key={t} index={i} />) }
          { provided.placeholder }
        </div>
      )}
    </Droppable>
  </div>
);

Year.propTypes = {
  year: PropTypes.object,
};

const DraggableYear = (props) => (
  <Draggable
    draggableId={props.year.fid}
    type="PLAN-YEAR"
    index={props.index}
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
          <Year {...props}/>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);

DraggableYear.propTypes = {
  year: PropTypes.object,
  index: PropTypes.number,
};

const YearContainer = connect(
  (state, { year }) => ({ year: state.plan.years[year] }),
  dispatch => ({}),
)(DraggableYear);

export default YearContainer;
