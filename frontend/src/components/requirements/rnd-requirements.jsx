import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';

class RndRequirements extends React.Component {
  prevWidth = 350;
  state = { width: 0, height: 300, show: false };

  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Remember the width when closing/opening
    if(this.state.show) {
      this.prevWidth = this.state.width;
    }

    if(prevProps.show !== this.props.show) {
      if(this.props.show) {
        this.setState({
          show: true,
          width: this.prevWidth,
        });
      } else {
        this.setState({
          show: false,
          width: 0,
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show ||
      nextState.width !== this.state.width ||
      nextState.height !== this.state.height;
  }

  position = { x: 0, y: 0 };
  enableResizing = { right: true };
  onResize(e, direction, ref, delta, position) {
    this.setState({
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    });
  }

  render() {
    const { width, height, show } = this.state;
    return (
      <Rnd
        className={'requirements ' + (show ? '' : 'hidden')}
        size={{ width: width, height: height }}
        position={this.position}
        disableDragging={true}
        enableResizing={this.enableResizing}
        onResize={this.onResize}
      >
        {this.props.children}
      </Rnd>
    );
  }
}
RndRequirements.propTypes = { show: PropTypes.bool, children: PropTypes.array };

const RndRequirementsContainer = connect(
  state => ({
    show: state.ui.showReqsSidebar,
  }),
  dispatch => ({}),
)(RndRequirements);

export default RndRequirementsContainer;

