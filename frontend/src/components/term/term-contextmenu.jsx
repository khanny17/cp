import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { Icon } from 'semantic-ui-react';
import { addCourse, deleteItem, minimizeTerm } from '../../actions/plan';

const TermContextMenu = ({ term, addCourse, minimizeTerm, deleteTerm }) =>
  <ContextMenu id={term}>
    <MenuItem onClick={addCourse}>
      <Icon name="plus" />Add Course
    </MenuItem>
    <MenuItem onClick={minimizeTerm}>
      <Icon name="minus" />Minimize Term
    </MenuItem>
    <MenuItem onClick={deleteTerm}>
      <Icon name="delete" />Delete Term
    </MenuItem>
  </ContextMenu>
;
TermContextMenu.propTypes = {
  term: PropTypes.string,
  addCourse: PropTypes.func,
  minimizeTerm: PropTypes.func,
  deleteTerm: PropTypes.func,
};


export default connect(
  state => ({}),
  (dispatch, { term }) => ({
    addCourse: () => dispatch(addCourse(term)),
    deleteTerm: () => dispatch(deleteItem('YEAR-TERM', term)),
    minimizeTerm: () => dispatch(minimizeTerm(term)),
  }),
)(TermContextMenu);
