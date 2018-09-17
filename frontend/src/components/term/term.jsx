import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Course from '../course';
import InlineEdit from 'react-edit-inline';
import { Droppable } from 'react-beautiful-dnd';
import { addCourse, updateTerm } from '../../actions/plan';

const Courses = ({ courses }) =>
  <React.Fragment>
    {courses.map((c, i) => <Course course={c} key={c} index={i} />)}
  </React.Fragment>
;
Courses.propTypes = { courses: PropTypes.array };

const CoursesContainer = connect(
  (state, { term }) => ({ courses: state.plan.terms[term].courses }),
)(Courses);


const Term = ({ term, updateTerm, addCourse }) =>
  <div className={term.minimized ? 'term minimized' : 'term' }>
    <InlineEdit
      className="term-title"
      text={term.title}
      paramName="title"
      change={update => updateTerm(update)}
      staticElement="h3"
    />
    <Droppable droppableId={term.fid} type="TERM-COURSE">
      {(provided, snapshot) =>
        <div
          ref={provided.innerRef}
          style={{
            border: snapshot.isDraggingOver ? '1px dashed gray' : 'none',
            borderRadius: '5px',
          }}
          {...provided.droppableProps}
          className="course-container"
        >
          <CoursesContainer term={term.fid} />
          { provided.placeholder }
          <button className="add-course-button" onClick={addCourse}>
            +
          </button>
        </div>
      }
    </Droppable>
  </div>
;
Term.propTypes = {
  term: PropTypes.object,
  addCourse: PropTypes.func,
  updateTerm: PropTypes.func,
};

export default connect(
  (state, { term }) => ({ term: state.plan.terms[term] }),
  (dispatch, { term }) => ({
    addCourse: () => dispatch(addCourse(term)),
    updateTerm: updates => dispatch(updateTerm(term, updates)),
  }),
)(Term);
