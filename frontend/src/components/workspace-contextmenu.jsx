import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { Icon } from 'semantic-ui-react';
import '../css/react-contextmenu.css';

const WorkspaceContextMenu = ({ id, onClick }) =>
  <ContextMenu id={id}>
    <MenuItem data={{ action: 'addYear', id: id }} onClick={onClick}>
      <Icon name="plus" />Add Year
    </MenuItem>
  </ContextMenu>
;

WorkspaceContextMenu.propTypes = {
  id: PropTypes.any,
  onClick: PropTypes.func,
};

export default WorkspaceContextMenu;
