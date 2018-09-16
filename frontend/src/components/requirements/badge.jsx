import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Icon } from 'semantic-ui-react';

class Badge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inner = this.inner.bind(this);
  }

  inner(provided, snapshot) {
    const { badge } = this.props;
    return (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <Icon name={badge.course ? 'circle outline' : 'certificate'}
            className="badge"/>
          {provided.placeholder}
        </div>
      </div>
    );
  }

  render() {
    const { badge } = this.props;
    return (
      <Draggable draggableId={badge.fid} type="COURSE-REQ" index="">
        {this.inner}
      </Draggable>
    );
  }
}
Badge.propTypes = { badge: PropTypes.object };

export default Badge;
