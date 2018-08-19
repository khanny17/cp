import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { Icon } from 'semantic-ui-react';
import '../css/react-contextmenu.css';

const TermContextMenu = ({ id, onClick }) =>
  <ContextMenu id={id}>
    <MenuItem data={{ action: 'addCourse', id: id }} onClick={onClick}>
      <Icon name="plus" />Add Course
    </MenuItem>
    <MenuItem data={{ action: 'deleteTerm', id: id }} onClick={onClick}>
      <Icon name="delete" />Delete Term
    </MenuItem>
  </ContextMenu>
;

TermContextMenu.propTypes = {
  id: PropTypes.any,
  onClick: PropTypes.func,
};

export default TermContextMenu;
