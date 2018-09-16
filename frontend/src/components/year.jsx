import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ContextMenuTrigger } from 'react-contextmenu';
import YearContextMenu from './year-contextmenu';
import { addTerm, deleteItem } from '../actions/plan';
import Term from './term';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import '../css/year.css';

const Year = ({ year }) => (
  <div className="year">
    <h2>{year.title}</h2>
    <Droppable droppableId={year.fid} type="YEAR-TERM" direction="horizontal">
      {(provided, snapshot) => (
        <div
          className="term-container"
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

const YearContainer = connect(
  (state, { year }) => ({ year: state.plan.years[year] }),
  dispatch => ({}),
)(Year);

const DraggableYear = ({ year, index }) => (
  <Draggable
    draggableId={year}
    type="PLAN-YEAR"
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
          <YearContainer year={year}/>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);
DraggableYear.propTypes = {
  year: PropTypes.string,
  index: PropTypes.number,
};


class ContextMenuYear extends React.Component {
  handleAction(e, data) {
    switch(data.action) {
    case 'addTerm':
      this.props.addTerm(this.props.year);
      break;
    case 'deleteYear':
      this.props.deleteYear(this.props.year);
      break;
    default:
      return;
    }
  }

  render() {
    return (
      <div>
        <ContextMenuTrigger id={this.props.year} >
          <DraggableYear {...this.props} />
        </ContextMenuTrigger>

        <YearContextMenu id={this.props.year}
          onClick={this.handleAction.bind(this)} />
      </div>
    );
  }
}
ContextMenuYear.propTypes = {
  year: PropTypes.string,
  addTerm: PropTypes.func,
  deleteYear: PropTypes.func,
  //I'm thinking of adding an 'Edit Colorscheme' option?
  //  you know, a modal to change subject colors all at once?
};

const ContextMenuYearContainer = connect(
  state => ({}),
  dispatch => ({
    addTerm: (year, term) => dispatch(addTerm(year, term)),
    deleteYear: year => dispatch(deleteItem('PLAN-YEAR', year)),
  }),
)(ContextMenuYear);


export default ContextMenuYearContainer;
