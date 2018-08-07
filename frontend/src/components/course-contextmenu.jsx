import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import '../css/react-contextmenu.css';

const CourseContextMenu = ({ id, onClick }) =>
  <ContextMenu id={id}>
    <MenuItem data={{ action: 'edit', id: id }} onClick={onClick}>
      Edit
    </MenuItem>
    <MenuItem data={{ action: 'delete', id: id }} onClick={onClick}>
      Delete
    </MenuItem>
  </ContextMenu>
;

CourseContextMenu.propTypes = {
  id: PropTypes.any,
  onClick: PropTypes.func,
};

export default CourseContextMenu;
