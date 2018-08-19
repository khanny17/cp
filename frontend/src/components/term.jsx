import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/term.css';
import Course from './course';
import { ContextMenuTrigger } from 'react-contextmenu';
import TermContextMenu from './term-contextmenu';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { addCourse, deleteItem } from '../actions/plan';

const Term = ({ term, addCourse }) => (
  <div className="term">
    <h3>{term.title}</h3>
    <Droppable droppableId={term.fid} type="TERM-COURSE">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            border: snapshot.isDraggingOver ? '1px dashed gray' : 'none',
            borderRadius: '5px',
          }}
          {...provided.droppableProps}
          className="course-container"
        >
          { term.courses.map((c, i) => <Course course={c} key={c} index={i} />) }
          { provided.placeholder }
          <button className="add-course-button" onClick={() => addCourse(term.fid)}>
            +
          </button>
        </div>
      )}
    </Droppable>
  </div>
);

Term.propTypes = {
  term: PropTypes.object,
  addCourse: PropTypes.func,
};

const DraggableTerm = (props) => (
  <Draggable
    draggableId={props.term.fid}
    type="YEAR-TERM"
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
  dispatch => ({
    addCourse: termId => dispatch(addCourse(termId)),
  }),
)(DraggableTerm);


class ContextMenuTerm extends React.Component {
  handleAction(e, data) {
    switch(data.action) {
    case 'addCourse':
      this.props.addCourse(this.props.term);
      break;
    case 'deleteTerm':
      this.props.deleteTerm(this.props.term);
      break;
    default:
      return;
    }
  }

  render() {
    return (
      <div>
        <ContextMenuTrigger id={this.props.term} >
          <TermContainer {...this.props} />
        </ContextMenuTrigger>

        <TermContextMenu id={this.props.term}
          onClick={this.handleAction.bind(this)} />
      </div>
    );
  }
}
ContextMenuTerm.propTypes = {
  term: PropTypes.string,
  addCourse: PropTypes.func,
  deleteTerm: PropTypes.func,
  //I'm thinking of adding an 'Edit Colorscheme' option?
  //  you know, a modal to change subject colors all at once?
};

const ContextMenuTermContainer = connect(
  state => ({}),
  dispatch => ({
    addCourse: (term, course) => dispatch(addCourse(term, course)),
    deleteTerm: term => dispatch(deleteItem('YEAR-TERM', term)),
  }),
)(ContextMenuTerm);


export default ContextMenuTermContainer;
