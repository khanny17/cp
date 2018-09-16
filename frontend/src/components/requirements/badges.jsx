import React from 'react';
import PropTypes from 'prop-types';
import Badge from './badge';
import { Droppable } from 'react-beautiful-dnd';

class Badges extends React.Component {
  constructor(props) {
    super(props);

    this.inner = this.inner.bind(this);
  }

  inner(provided, snapshot) {
    const { badges } = this.props;
    return (
      <div ref={provided.innerRef}>
        {badges.map(badge => <Badge key={badge.fid} badge={badge} />)}
        { provided.placeholder }
      </div>
    );
  }

  render() {
    return (
      <div className="badges">
        <Droppable droppableId="REQUIREMENTS" type="COURSE-REQ">
          {this.inner}
        </Droppable>
      </div>
    );
  }
}

Badges.propTypes = { badges: PropTypes.array };

export default Badges;
