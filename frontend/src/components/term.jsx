import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/term.css';
import Course from './course';
import { ContextMenuTrigger } from 'react-contextmenu';
import TermContextMenu from './term-contextmenu';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { addCourse, deleteItem, minimizeTerm, updateTerm } from '../actions/plan';
import InlineEdit from 'react-edit-inline';


const Term = ({ term, addCourse, updateTerm }) =>
  <div className={term.minimized ? 'term minimized' : 'term' }>
    <InlineEdit
      className="term-title"
      text={term.title}
      paramName="title"
      change={update => updateTerm(term.fid, update)}
      staticElement="h3"
    />
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
          <button className="add-course-button"
            onClick={() => addCourse(term.fid)}>
            +
          </button>
        </div>
      )}
    </Droppable>
  </div>
;
Term.propTypes = {
  term: PropTypes.object,
  addCourse: PropTypes.func,
  updateTerm: PropTypes.func,
};

const TermContainer = connect(
  (state, { term }) => ({ term: state.plan.terms[term] }),
  dispatch => ({
    addCourse: termId => dispatch(addCourse(termId)),
    updateTerm: (fid, updates) => dispatch(updateTerm(fid, updates)),
  }),
)(Term);

const DraggableTerm = ({ term, index }) => (
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
          <TermContainer term={term}/>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);
DraggableTerm.propTypes = {
  term: PropTypes.string,
  index: PropTypes.number,
};


class ContextMenuTerm extends React.Component {
  handleAction(e, data) {
    switch(data.action) {
    case 'addCourse':
      this.props.addCourse(this.props.term);
      break;
    case 'minimizeTerm':
      this.props.minimizeTerm(this.props.term);
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
      <div className="pre-term-context-menu">
        <ContextMenuTrigger id={this.props.term}>
          <DraggableTerm {...this.props} />
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
  minimizeTerm: PropTypes.func,
  deleteTerm: PropTypes.func,
  //I'm thinking of adding an 'Edit Colorscheme' option?
  //  you know, a modal to change subject colors all at once?
};

const ContextMenuTermContainer = connect(
  state => ({}),
  dispatch => ({
    addCourse: (term, course) => dispatch(addCourse(term, course)),
    deleteTerm: term => dispatch(deleteItem('YEAR-TERM', term)),
    minimizeTerm: term => dispatch(minimizeTerm(term)),
  }),
)(ContextMenuTerm);


export default ContextMenuTermContainer;
