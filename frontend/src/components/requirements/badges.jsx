import React from 'react';
import PropTypes from 'prop-types';
import Badge from './badge';
import { Droppable } from 'react-beautiful-dnd';

const Badges = ({ badges }) =>
  <div className="badges">
    <Droppable droppableId={badges[0].fid} type="COURSE-REQ">
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {badges.map(badge => <Badge key={badge.fid} badge={badge} />)}
          { provided.placeholder }
        </div>
      )}
    </Droppable>
  </div>
;
Badges.propTypes = { badges: PropTypes.array };

export default Badges;
