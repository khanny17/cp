import React from 'react';
import RndRequirements from './rnd-requirements';
import Requirements from './requirements';
import SidebarToggle from './sidebar-toggle';
import '../../css/requirements.css';

const RequirementsIndex = () =>
  <RndRequirements>
    <Requirements />
    <SidebarToggle />
  </RndRequirements>
;

export default RequirementsIndex;
