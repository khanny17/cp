import React from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';
import '../../css/requirements.css';
import Requirements from './requirements';

class RndRequirements extends React.Component {
  state = { width: 300, height: 300 };
  render() {
    const { width, height } = this.state;
    return (
      <Rnd
        className="requirements"
        size={{ width: width, height: height }}
        position={{ x: 0, y: 0 }}
        disableDragging={true}
        enableResizing={{ right: true }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
      >
        <Requirements {...this.props} />
      </Rnd>
    );
  }
}
RndRequirements.propTypes = { show: PropTypes.bool };

export default RndRequirements;
