import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Badge from './badge';
import { Droppable } from 'react-beautiful-dnd';

const Badges = ({ id, requirement }) =>
  <div className="badges">
    <Droppable droppableId={id+' badges'} type="COURSE-REQ">
      {(provided, snapshot) =>
        <div ref={provided.innerRef}>
          {requirement.type === 'ATTRIBUTE' ?
            <Badge key={id} requirement={id}/>
            : null
          }
          { provided.placeholder }
        </div>
      }
    </Droppable>
  </div>
;
Badges.propTypes = { id: PropTypes.string, requirement: PropTypes.object };

export default connect(
  (state, { id }) => ({
    requirement: state.plan.requirements[id],
  })
)(Badges);
