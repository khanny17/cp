import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { Icon } from 'semantic-ui-react';
import '../css/react-contextmenu.css';

const YearContextMenu = ({ id, onClick }) =>
  <ContextMenu id={id}>
    <MenuItem data={{ action: 'addTerm', id: id }} onClick={onClick}>
      <Icon name="plus" />Add Term
    </MenuItem>
    <MenuItem data={{ action: 'deleteYear', id: id }} onClick={onClick}>
      <Icon name="delete" />Delete Year
    </MenuItem>
  </ContextMenu>
;

YearContextMenu.propTypes = {
  id: PropTypes.any,
  onClick: PropTypes.func,
};

export default YearContextMenu;
